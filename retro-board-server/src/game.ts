import {
  Actions,
  Session,
  Post,
  User,
  Vote,
  VoteType,
} from 'retro-board-common';
import chalk from 'chalk';
import moment from 'moment';
import socketIo from 'socket.io';
import { find } from 'lodash';
import uuid from 'uuid';
import { Store } from './types';

const {
  RECEIVE_POST,
  RECEIVE_BOARD,
  RECEIVE_DELETE_POST,
  RECEIVE_LIKE,
  RECEIVE_EDIT_POST,
  ADD_POST_SUCCESS,
  DELETE_POST,
  LIKE_SUCCESS,
  EDIT_POST,
  RECEIVE_CLIENT_LIST,
  RECEIVE_SESSION_NAME,
  JOIN_SESSION,
  RENAME_SESSION,
  LEAVE_SESSION,
} = Actions;

interface ExtendedSocket extends socketIo.Socket {
  sessionId: string;
  user: User | null;
}

interface Users {
  [socketId: string]: User | null;
}

interface UserData {
  user: User;
}

interface NameData extends UserData {
  name: string;
}

interface PostUpdate extends UserData {
  post: Post;
}

interface LikeUpdate extends PostUpdate {
  type: VoteType;
}

const s = (str: string) => chalk`{blue ${str.replace('retrospected/', '')}}`;

export default (store: Store, io: SocketIO.Server) => {
  const users: Users = {};
  const d = () => chalk`{yellow [${moment().format('HH:mm:ss')}]} `;

  const getRoom = (sessionId: string) => `board-${sessionId}`;

  const sendToAll = (
    socket: ExtendedSocket,
    sessionId: string,
    action: string,
    data: any
  ) => {
    console.log(
      chalk`${d()}{green  ==> } ${s(action)} {grey ${JSON.stringify(data)}}`
    );
    socket.broadcast.to(getRoom(sessionId)).emit(action, data);
  };

  const sendToSelf = (socket: ExtendedSocket, action: string, data: any) => {
    console.log(
      chalk`${d()}{green  --> } ${s(action)} {grey ${JSON.stringify(data)}}`
    );
    socket.emit(action, data);
  };

  const persistSession = (user: User, session: Session) => {
    if (!user) {
      return;
    }
    store.saveSession(user, session).catch((err: string) => console.error(err));
  };

  const persistPost = (user: User, sessionId: string, post: Post) => {
    if (!user) {
      return;
    }
    store
      .savePost(user, sessionId, post)
      .catch((err: string) => console.error(err));
  };

  const persistVote = (
    user: User,
    sessionId: string,
    postId: string,
    vote: Vote
  ) => {
    if (!user) {
      return;
    }
    store.saveVote(user, sessionId, postId, vote);
  };

  const deletePost = (user: User, sessionId: string, postId: string) => {
    if (!user) {
      return;
    }
    store
      .deletePost(user, sessionId, postId)
      .catch((err: string) => console.error(err));
  };

  const sendClientList = (sessionId: string, socket: ExtendedSocket) => {
    const room = io.nsps['/'].adapter.rooms[getRoom(sessionId)];
    if (room) {
      const clients = Object.keys(room.sockets);
      const names = clients.map(
        (id, i) =>
          users[id] || {
            id: socket.id,
            name: `(Spectator #${i})`,
            username: null,
            photo: null,
            accountType: 'anonymous',
            created: null,
            updated: null,
          }
      );

      sendToSelf(socket, RECEIVE_CLIENT_LIST, names);
      sendToAll(socket, sessionId, RECEIVE_CLIENT_LIST, names);
    }
  };

  const recordUser = (
    sessionId: string,
    user: User,
    socket: ExtendedSocket
  ) => {
    const socketId = socket.id;
    if (!users[socketId] || users[socketId]!.id !== user.id) {
      users[socketId] = user || null;
    }

    sendClientList(sessionId, socket);
  };

  const receivePost = async (
    user: User,
    session: Session,
    post: Post,
    socket: ExtendedSocket
  ) => {
    if (!user) {
      return;
    }
    persistPost(user, session.id, post);
    sendToAll(socket, session.id, RECEIVE_POST, post);
  };

  const joinSession = async (
    user: User,
    session: Session,
    _: UserData,
    socket: ExtendedSocket
  ) => {
    socket.join(getRoom(session.id), () => {
      socket.sessionId = session.id;
      sendToSelf(socket, RECEIVE_BOARD, session);
      recordUser(session.id, user, socket);
    });
  };

  const renameSession = async (
    user: User,
    session: Session,
    data: NameData,
    socket: ExtendedSocket
  ) => {
    if (!user) {
      return;
    }
    session.name = data.name;
    persistSession(user, session);
    sendToAll(socket, session.id, RECEIVE_SESSION_NAME, data.name);
  };

  const leave = async (
    _user: User,
    session: Session,
    _data: void,
    socket: ExtendedSocket
  ) => {
    socket.leave(getRoom(session.id), () => {
      sendClientList(session.id, socket);
    });
  };

  const onDeletePost = async (
    user: User,
    session: Session,
    data: Post,
    socket: ExtendedSocket
  ) => {
    if (!user) {
      return;
    }
    session.posts = session.posts.filter(p => p.id !== data.id);
    deletePost(user, session.id, data.id);
    sendToAll(socket, session.id, RECEIVE_DELETE_POST, data);
  };

  const like = async (
    user: User,
    session: Session,
    data: LikeUpdate,
    socket: ExtendedSocket
  ) => {
    if (!user) {
      return;
    }
    const post = find(session.posts, p => p.id === data.post.id);
    if (post) {
      const existingVote: Vote | undefined = find(
        post.votes,
        v => v.user.id === data.user.id && v.type === data.type
      );

      if (session.allowMultipleVotes || !existingVote) {
        const vote: Vote = {
          id: uuid.v4(),
          user: data.user,
          type: data.type,
        };
        persistVote(user, session.id, post.id, vote);
        sendToAll(socket, session.id, RECEIVE_LIKE, { postId: post.id, vote });
      }
    }
  };

  const edit = async (
    user: User,
    session: Session,
    data: PostUpdate,
    socket: ExtendedSocket
  ) => {
    if (!user) {
      return;
    }
    const post = find(session.posts, p => p.id === data.post.id);
    if (post) {
      post.content = data.post.content;
      post.action = data.post.action;
      persistPost(user, session.id, post);
      sendToAll(socket, session.id, RECEIVE_EDIT_POST, data);
    }
  };

  io.on('connection', (socket: ExtendedSocket) => {
    const ip =
      socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    const user = socket.request.session?.passport?.user;
    socket.user = user;
    console.log(
      d() +
        chalk`{blue Connection: {red New user connected} {grey ${
          socket.id
        } ${ip} ${user ? user.username : 'anon'}}}`
    );

    interface Action {
      type: string;
      handler: (
        user: User,
        session: Session,
        data: any,
        socket: ExtendedSocket
      ) => Promise<void>;
    }

    const actions: Action[] = [
      { type: ADD_POST_SUCCESS, handler: receivePost },
      { type: JOIN_SESSION, handler: joinSession },
      { type: RENAME_SESSION, handler: renameSession },
      { type: DELETE_POST, handler: onDeletePost },
      { type: LIKE_SUCCESS, handler: like },
      { type: EDIT_POST, handler: edit },
      { type: LEAVE_SESSION, handler: leave },
    ];

    actions.forEach(action => {
      socket.on(action.type, data => {
        console.log(
          chalk`${d()}{red  <-- } ${s(action.type)} {grey ${JSON.stringify(
            data
          )}}`
        );
        const sid =
          action.type === LEAVE_SESSION ? socket.sessionId : data.sessionId;
        if (sid) {
          store.get(user, sid).then((session: Session | null) => {
            if (session) {
              action.handler(user, session, data.payload, socket);
            }
          });
        }
      });
    });

    socket.on('disconnect', () => {
      if (socket.sessionId) {
        console.log(
          chalk`${d()}{blue Disconnection: }{red User left} {grey ${
            socket.id
          } ${ip}}`
        );

        sendClientList(socket.sessionId, socket);
      }
    });
  });
};
