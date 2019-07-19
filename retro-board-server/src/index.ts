import express from 'express';
import socketIo from 'socket.io';
import http from 'http';
import { find } from 'lodash';
import chalk from 'chalk';
import moment from 'moment';
import db from './db';
import { Actions, Session, Post, User } from 'retro-board-common';
import config from './db/config';

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
  LOGIN_SUCCESS,
} = Actions;

const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);
const port = config.BACKEND_PORT || 8081;

const s = (str: string) => chalk`{blue ${str.replace('retrospected/', '')}}`;

interface ExtendedSocket extends socketIo.Socket {
  sessionId: string;
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
  like: boolean;
}

db().then(store => {
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

  const persistSession = (session: Session) =>
    store.saveSession(session).catch((err: string) => console.error(err));

  const persistPost = (sessionId: string, post: Post) =>
    store.savePost(sessionId, post).catch((err: string) => console.error(err));

  const deletePost = (sessionId: string, postId: string) =>
    store
      .deletePost(sessionId, postId)
      .catch((err: string) => console.error(err));

  const sendClientList = (sessionId: string, socket: ExtendedSocket) => {
    const room = io.nsps['/'].adapter.rooms[getRoom(sessionId)];
    if (room) {
      const clients = Object.keys(room.sockets);
      const names = clients.map((id, i) => users[id] || `(Anonymous #${i})`);

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
    session: Session,
    post: Post,
    socket: ExtendedSocket
  ) => {
    persistPost(session.id, post);
    sendToAll(socket, session.id, RECEIVE_POST, post);
  };

  const joinSession = async (
    session: Session,
    data: UserData,
    socket: ExtendedSocket
  ) => {
    socket.join(getRoom(session.id), () => {
      socket.sessionId = session.id;
      if (session.posts.length) {
        sendToSelf(socket, RECEIVE_BOARD, session.posts);
      }
      if (session.name) {
        sendToSelf(socket, RECEIVE_SESSION_NAME, session.name);
      }

      recordUser(session.id, data.user, socket);
    });
  };

  const renameSession = async (
    session: Session,
    data: NameData,
    socket: ExtendedSocket
  ) => {
    session.name = data.name;
    persistSession(session);
    sendToAll(socket, session.id, RECEIVE_SESSION_NAME, data.name);
  };

  const leave = async (session: Session, _: void, socket: ExtendedSocket) => {
    socket.leave(getRoom(session.id), () => {
      sendClientList(session.id, socket);
    });
  };

  const login = async (
    session: Session,
    data: UserData,
    socket: ExtendedSocket
  ) => {
    recordUser(session.id, data.user, socket);
  };

  const onDeletePost = async (
    session: Session,
    data: Post,
    socket: ExtendedSocket
  ) => {
    session.posts = session.posts.filter(p => p.id !== data.id);
    deletePost(session.id, data.id);
    sendToAll(socket, session.id, RECEIVE_DELETE_POST, data);
  };

  const like = async (
    session: Session,
    data: LikeUpdate,
    socket: ExtendedSocket
  ) => {
    const post = find(session.posts, p => p.id === data.post.id);
    if (post) {
      const array = data.like ? post.likes : post.dislikes;

      if (!array.find(u => u.id === data.user.id)) {
        array.push(data.user);
        persistPost(session.id, post);
        sendToAll(socket, session.id, RECEIVE_LIKE, post);
      }
    }
  };

  const edit = async (
    session: Session,
    data: PostUpdate,
    socket: ExtendedSocket
  ) => {
    const post = find(session.posts, p => p.id === data.post.id);
    if (post) {
      post.content = data.post.content;
      post.action = data.post.action;
      persistPost(session.id, post);
      sendToAll(socket, session.id, RECEIVE_EDIT_POST, data);
    }
  };

  io.on('connection', (socket: ExtendedSocket) => {
    const ip =
      socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    console.log(
      d() +
        chalk`{blue Connection: {red New user connected} {grey ${
          socket.id
        } ${ip}}}`
    );

    interface Action {
      type: string;
      handler: (
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
      { type: LOGIN_SUCCESS, handler: login },
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
          store.get(sid).then((session: Session) => {
            action.handler(session, data.payload, socket);
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

  httpServer.listen(port);
  const env = process.env.NODE_ENV || 'dev';
  console.log(
    chalk`Server started on port {red ${port.toString()}}, environment: {blue ${env}}`
  );
});
