import express from 'express';
import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import uuid from 'node-uuid';
import find from 'lodash/find';
import chalk from 'chalk';
import db from './db';
import migrate2to3 from './migrate2to3';

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const port = process.env.PORT || 8081;
const htmlFile = process.env.NODE_ENV === 'production' ?
    path.resolve(__dirname, '..', 'assets', 'index.html') :
    path.resolve(__dirname, '..', 'content', 'index.html');
const staticFolder = path.resolve(__dirname, '..', 'assets');

db().then(store => {

    const users = {};

    app.use('/assets', express.static(staticFolder));
    app.get('/migrate', (req, res) => {
        migrate2to3(store);
        res.send('ok');
    });
    app.get('/*', (req, res) => res.sendFile(htmlFile));

    io.on('connection', socket => {
        console.log(chalk.blue('Connection: ')+chalk.red('New user connected'), chalk.grey(socket.id));

        const actions = [
            { type: 'ADD_POST_SUCCESS', handler: receivePost },
            { type: 'JOIN_SESSION', handler: joinSession },
            { type: 'RENAME_SESSION', handler: renameSession },
            { type: 'DELETE_POST', handler: deletePost },
            { type: 'LIKE_SUCCESS', handler: like },
            { type: 'LOGIN_SUCCESS', handler: login },
            { type: 'LEAVE_SESSION', handler: leave }
        ];

        actions.forEach(action => {
            socket.on(action.type, data => {
                console.log(chalk.red(' <-- (In)   ')+chalk.blue(action.type), chalk.grey(JSON.stringify(data)));
                const sid = action.type === 'LEAVE_SESSION' ? socket.sessionId : data.sessionId;
                if (sid) {
                    store.get(sid).then(session => {
                        action.handler(session, data.payload, socket);
                    });
                }
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

    const receivePost = (session, data, socket) => {
        session.posts.push(data);
        persist(session);
        sendToAll(socket, session.id, 'RECEIVE_POST', data);
    };

    const joinSession = (session, data, socket) => {
        socket.join(getRoom(session.id), () => {
            socket.sessionId = session.id;
            if (session.posts.length) {
                sendToSelf(socket, 'RECEIVE_BOARD', session.posts);
            }
            if (session.name) {
                sendToSelf(socket, 'RECEIVE_SESSION_NAME', session.name);
            }

            recordUser(session.id, data.user, socket);
        });
    };

    const renameSession = (session, data, socket) => {
        session.name = data;
        persist(session);
        sendToAll(socket, session.id, 'RECEIVE_SESSION_NAME', data);
    };

    const leave = (session, data, socket) => {
        socket.leave(getRoom(session.id), () => {
            sendClientList(session.id, socket);
        });
    };

    const login = (session, data, socket) => {
        recordUser(session.id, data.name, socket);
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

    const deletePost = (session, data, socket) => {
        session.posts = session.posts.filter(p => p.id !== data.id);
        persist(session);
        sendToAll(socket, session.id, 'RECEIVE_DELETE_POST', data);
    };

    const like = (session, data, socket) => {
        const post = find(session.posts, p => p.id === data.post.id);
        if (post) {
            const array = data.like ? post.likes : post.dislikes;

            if (array.indexOf(data.user) === -1) {
                array.push(data.user);
                persist(session);
                sendToAll(socket, session.id, 'RECEIVE_LIKE', data);
            }
        }
    };

    const sendToAll = (socket, sessionId, action, data) => {
        console.log(chalk.green(' --> (All) ')+' '+chalk.blue(action)+' '+chalk.grey(JSON.stringify(data)));
        socket
            .broadcast
            .to(getRoom(sessionId))
            .emit(action, data);
    };

    const sendToSelf = (socket, action, data) => {
        console.log(chalk.green(' --> (Self)')+' '+chalk.blue(action)+' '+chalk.grey(JSON.stringify(data)));
        socket.emit(action, data);
    };

    const persist = session => {
        return store.set(session).catch(err => console.error(err));
    }

    const recordUser = (sessionId, name, socket) => {
        const socketId = socket.id;
        if (!users[socketId] || users[socketId] !== name) {
            users[socketId] = name || null;
        }

        sendClientList(sessionId, socket);
    }

    const getRoom = sessionId => 'board-'+sessionId;

});
