import express from 'express';
import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import uuid from 'node-uuid';
import find from 'lodash/find';
import chalk from 'chalk';
import db from './db';

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const port = process.env.PORT || 8081;
const htmlFile = process.env.NODE_ENV === 'production' ?
    path.resolve(__dirname, '..', 'assets', 'index.html') :
    path.resolve(__dirname, '..', 'content', 'index.html');
const staticFolder = path.resolve(__dirname, '..', 'assets');


const store = db();
const users = {};

app.use('/assets', express.static(staticFolder));
app.get('/*', (req, res) => res.sendFile(htmlFile));

io.on('connection', socket => {
    console.log(chalk.blue('Connection: ')+chalk.red('New user connected'), chalk.grey(socket.id));

    const actions = [
        { type: 'ADD_POST_SUCCESS', handler: receivePost },
        { type: 'JOIN_SESSION', handler: joinSession },
        { type: 'DELETE_POST', handler: deletePost },
        { type: 'LIKE', handler: like },
        { type: 'LOGIN_SUCCESS', handler: login },
        { type: 'LEAVE_SESSION', handler: leave }
    ];

    actions.forEach(action => {
        socket.on(action.type, data => {
            console.log(chalk.blue('Action: ')+chalk.red(action.type), chalk.grey(JSON.stringify(data)));
            getSession(data.sessionId).then(session => {
                action.handler(data.sessionId, session, data.payload, socket);
            });
        });
    });

    socket.on('disconnect', () => {
        if (socket.sessionId) {
            sendClientList(socket.sessionId, socket);
        }
    });

});

httpServer.listen(port);
console.log('Server started on port ' + chalk.red(port)+', environement: '+chalk.blue(process.env.NODE_ENV || 'dev'));

const receivePost = (sessionId, session, data, socket) => {
    session.posts.push(data);
    persist(sessionId, session);
    sendToAll(socket, sessionId, 'RECEIVE_POST', data);
};

const joinSession = (sessionId, session, data, socket) => {
    socket.join(getRoom(sessionId), () => {
        socket.sessionId = sessionId;
        if (session.posts.length) {
            sendToSelf(socket, 'RECEIVE_BOARD', session.posts);
        }

        recordUser(sessionId, data.user, socket);
    });

};

const leave = (sId, session, data, socket) => {
    const sessionId = socket.sessionId;
    if (sessionId) {
        socket.leave(getRoom(socket.sessionId), () => {
            sendClientList(socket.sessionId, socket);
        });
    }
};

const login = (sessionId, session, data, socket) => {
    recordUser(sessionId, data.name, socket);
};

const sendClientList = (sessionId, socket) => {
    const room = io.nsps['/'].adapter.rooms[getRoom(sessionId)];
    if (room) {
        const clients = Object.keys(room.sockets);
        const names = clients.map((id, i) => users[id] || `(Anonymous #${i})`);

        sendToSelf(socket, 'RECEIVE_CLIENT_LIST', names);
        sendToAll(socket, sessionId, 'RECEIVE_CLIENT_LIST', names);
    }
};

const deletePost = (sessionId, session, data, socket) => {
    if (session) {
        session.posts = session.posts.filter(p => p.id !== data.id);
        persist(sessionId, session);
        sendToAll(socket, sessionId, 'RECEIVE_DELETE_POST', data);
    }
};

const like = (sessionId, session, data, socket) => {
    if (session) {
        const post = find(session.posts, p => p.id === data.post.id);
        if (post) {
            post.votes += data.count;
            persist(sessionId, session);
            sendToAll(socket, sessionId, 'RECEIVE_LIKE', data);
        }
    }
};

const getSession = (sessionId) => {
    if (!sessionId) {
        return Promise.resolve(null);
    } else {
        return store.get(sessionId);
    }
};

const sendToAll = (socket, sessionId, action, data) => {
    socket
        .broadcast
        .to(getRoom(sessionId))
        .emit(action, data);
};

const sendToSelf = (socket, action, data) => {
    socket.emit(action, data);
};

const persist = (sessionId, session) => {
    return store.set(sessionId, session).catch(err => console.error(err));
}

const recordUser = (sessionId, name, socket) => {
    const socketId = socket.id;
    if (!users[socketId] || users[socketId] !== name) {
        users[socketId] = name || null;
    }

    sendClientList(sessionId, socket);
}

const getRoom = sessionId => 'board-'+sessionId;
