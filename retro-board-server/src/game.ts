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
  userId: string | null;
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

  const persistSession = (userId: string | null, session: Session) => {
    if (!userId) {
      return;
    }
    store
      .saveSession(userId, session)
      .catch((err: string) => console.error(err));
  };

  const persistPost = (
    userId: string | null,
    sessionId: string,
    post: Post
  ) => {
    if (!userId) {
      return;
    }
    store
      .savePost(userId, sessionId, post)
      .catch((err: string) => console.error(err));
  };

  const persistVote = (
    userId: string | null,
    sessionId: string,
    postId: string,
    vote: Vote
  ) => {
    if (!userId) {
      return;
    }
    store.saveVote(userId, sessionId, postId, vote);
  };

  const deletePost = (
    userId: string | null,
    sessionId: string,
    postId: string
  ) => {
    if (!userId) {
      return;
    }
    store
      .deletePost(userId, sessionId, postId)
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
    userId: string | null,
    session: Session,
    post: Post,
    socket: ExtendedSocket
  ) => {
    if (!userId) {
      return;
    }
    persistPost(userId, session.id, post);
    sendToAll(socket, session.id, RECEIVE_POST, post);
  };

  const joinSession = async (
    userId: string | null,
    session: Session,
    _: UserData,
    socket: ExtendedSocket
  ) => {
    socket.join(getRoom(session.id), async () => {
      socket.sessionId = session.id;
      sendToSelf(socket, RECEIVE_BOARD, session);
      if (userId) {
        const user = await store.getUser(userId);
        if (user) {
          recordUser(session.id, user, socket);
        }
      }
    });
  };

  const renameSession = async (
    userId: string | null,
    session: Session,
    data: NameData,
    socket: ExtendedSocket
  ) => {
    if (!userId) {
      return;
    }
    session.name = data.name;
    persistSession(userId, session);
    sendToAll(socket, session.id, RECEIVE_SESSION_NAME, data.name);
  };

  const leave = async (
    _userId: string | null,
    session: Session,
    _data: void,
    socket: ExtendedSocket
  ) => {
    socket.leave(getRoom(session.id), () => {
      sendClientList(session.id, socket);
    });
  };

  const onDeletePost = async (
    userId: string | null,
    session: Session,
    data: Post,
    socket: ExtendedSocket
  ) => {
    if (!userId) {
      return;
    }
    session.posts = session.posts.filter(p => p.id !== data.id);
    deletePost(userId, session.id, data.id);
    sendToAll(socket, session.id, RECEIVE_DELETE_POST, data);
  };

  const like = async (
    userId: string | null,
    session: Session,
    data: LikeUpdate,
    socket: ExtendedSocket
  ) => {
    if (!userId) {
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
        persistVote(userId, session.id, post.id, vote);
        sendToAll(socket, session.id, RECEIVE_LIKE, { postId: post.id, vote });
      }
    }
  };

  const edit = async (
    userId: string | null,
    session: Session,
    data: PostUpdate,
    socket: ExtendedSocket
  ) => {
    if (!userId) {
      return;
    }
    const post = find(session.posts, p => p.id === data.post.id);
    if (post) {
      post.content = data.post.content;
      post.action = data.post.action;
      persistPost(userId, session.id, post);
      sendToAll(socket, session.id, RECEIVE_EDIT_POST, data);
    }
  };

  io.on('connection', async (socket: ExtendedSocket) => {
    const ip =
      socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    // Todo: this is a bit hacky
    const userId: string = socket.request.session?.passport?.user;
    socket.userId = userId;
    console.log(
      d() +
        chalk`{blue Connection: {red New user connected} {grey ${
          socket.id
        } ${ip} ${userId ? userId : 'anon'}}}`
    );

    interface Action {
      type: string;
      handler: (
        userId: string | null,
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
      socket.on(action.type, async data => {
        console.log(
          chalk`${d()}{red  <-- } ${s(action.type)} {grey ${JSON.stringify(
            data
          )}}`
        );
        const sid =
          action.type === LEAVE_SESSION ? socket.sessionId : data.sessionId;
        if (sid) {
          const session = await store.getSession(userId, sid);
          if (session) {
            action.handler(userId, session, data.payload, socket);
          }
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
