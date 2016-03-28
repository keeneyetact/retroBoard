import express from 'express';
import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import uuid from 'node-uuid';
import find from 'lodash/find';
import chalk from 'chalk';
import storage from 'node-persist';

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const port = process.env.PORT || 8081;
const htmlFile = path.resolve(__dirname, '..', 'static', process.env.NODE_ENV === 'production' ? 'index-prod.html':'index.html');
const staticFolder = path.resolve(__dirname, '..', 'static');

storage.initSync();

const sessions = storage.getItem('sessions') || {};
const users = {};

app.use('/assets', express.static(staticFolder));

app.get('/api/create', (req, res) => {
    const id = uuid.v1();
    return res.json({
        id
    });
});

app.get('/*', (req, res) => res.sendFile(htmlFile));


io.on('connection', socket => {
    console.log(chalk.blue('Connection: ')+chalk.red('New user connected'), chalk.grey(socket.id));

    const actions = [
        { type: 'ADD_POST', handler: receivePost },
        { type: 'JOIN_SESSION', handler: joinSession },
        { type: 'DELETE_POST', handler: deletePost },
        { type: 'LIKE', handler: like },
        { type: 'LOGIN_SUCCESS', handler: login },
        { type: 'LEAVE_SESSION', handler: leave }
    ];

    actions.forEach(action => {
        socket.on(action.type, data => {
            console.log(chalk.blue('Action: ')+chalk.red(action.type), chalk.grey(JSON.stringify(data)));
            action.handler(data.sessionId, data.payload, socket, () => {
                persist();
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

const receivePost = (sessionId, data, socket, done) => {
    const session = getSession(sessionId);
    session.posts.push(data);
    sendToAll(socket, sessionId, 'RECEIVE_POST', data);
    done();
};

const joinSession = (sessionId, data, socket, done) => {
    socket.join('board-' + sessionId, () => {
        socket.sessionId = sessionId;
        const session = getSession(sessionId);

        if (session.posts.length) {
            sendToSelf(socket, 'RECEIVE_BOARD', session.posts);
        }

        recordUser(sessionId, data.user, socket);
        done();
    });

};

const leave = (sessionId, data, socket, done) => {
    socket.leave('board-'+data);
    sendClientList(data, socket);
};

const login = (sessionId, data, socket, done) => {
    recordUser(sessionId, data.name, socket);
    done();
};

const sendClientList = (sessionId, socket) => {
    const room = io.nsps['/'].adapter.rooms[getRoom(sessionId)];
    if (room) {
        const clients = Object.keys(room.sockets);
        const names = clients.map(id => users[id] || '?');

        sendToSelf(socket, 'RECEIVE_CLIENT_LIST', names);
        sendToAll(socket, sessionId, 'RECEIVE_CLIENT_LIST', names);
    }
};

const deletePost = (sessionId, data, socket, done) => {
    const session = getSession(sessionId);
    if (session) {
        session.posts = session.posts.filter(p => p.id !== data.id);
        sendToAll(socket, sessionId, 'RECEIVE_DELETE_POST', data);
        done();
    }
};

const like = (sessionId, data, socket, done) => {
    const session = getSession(sessionId);
    if (session) {
        const post = find(session.posts, p => p.id === data.post.id);
        if (post) {
            post.votes += data.count;
            sendToAll(socket, sessionId, 'RECEIVE_LIKE', data);
            done();
        }
    }
};

const getSession = (sessionId) => {
    if (!sessionId) {
        return null;
    }
    if (!sessions[sessionId]) {
        sessions[sessionId] = {
            posts: []
        };
    }
    return sessions[sessionId];
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

const persist = () => {
    storage.setItem("sessions", sessions);
}

const recordUser = (sessionId, name, socket) => {
    const socketId = socket.id;
    if (!users[socketId] || users[socketId] !== name) {
        users[socketId] = name || '?';
        sendClientList(sessionId, socket);
    }
}

const getRoom = sessionId => 'board-'+sessionId;
