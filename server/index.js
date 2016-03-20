import express from 'express';
import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import uuid from 'node-uuid';
import find from 'lodash/find';

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const port = process.env.PORT || 8081;
const htmlFile = path.resolve(__dirname, '..', 'static', process.env.NODE_ENV === 'production' ? 'index-prod.html':'index.html');
const staticFolder = path.resolve(__dirname, '..', 'static');

const sessions = {};

console.log('Static folder: ', staticFolder);

app.use('/assets', express.static(staticFolder));

app.get('/api/create', (req, res) => {
    const id = uuid.v1();
    return res.json({
        id
    });
});

app.get('/*', (req, res) => res.sendFile(htmlFile));


io.on('connection', socket => {
    console.log('a user connected on socket '+socket.id);

    socket.on('ADD_POST', data => {
        console.log('ADD POST: ', data);
        receivePost(data, socket);
    });

    socket.on('JOIN_SESSION', data => {
        console.log('JOIN SESSION ', data);
        joinSession(data, socket);
    });

    socket.on('DELETE_POST', data => {
        console.log('DELETING POST');
        deletePost(data, socket);
    });

    socket.on('LIKE', data => {
        console.log('LIKE');
        like(data, socket);
    });

    socket.on('LOGIN', data => {
        console.log('LOGIN');
        login(data, socket);
    });
});



httpServer.listen(port);
console.log('Server started on port ' + port);

const receivePost = (data, socket) => {
    if (!sessions[data.sessionId]) {
        sessions[data.sessionId] = {
            posts: []
        };
    }
    sessions[data.sessionId].posts.push(data);

    socket
        .broadcast
        .to('board-'+data.sessionId)
        .emit('RECEIVE_POST', data);
};

const joinSession = (data, socket) => {
    socket.join('board-' + data.sessionId, () => {
        const existingData = sessions[data.sessionId];
        if (existingData) {
            socket.emit('RECEIVE_BOARD', existingData.posts);
        } else {
            sessions[data.sessionId] = {
                posts: [],
                clients: []
            };
        }

        addClient(data.sessionId, data.user);
        sendClientList(data.sessionId, socket);
    });

};

const login = (data, socket) => {
    addClient(data.sessionId, data.name);
    sendClientList(data.sessionId, socket);
};

const addClient = (sessionId, user) => {
    const existingData = sessions[sessionId];
    if (existingData && existingData.clients && user && existingData.clients.indexOf(user) === -1) {
        existingData.clients.push(user);
    }
};

const sendClientList = (sessionId, socket) => {
    if (sessionId && sessions[sessionId]) {
        const clients = sessions[sessionId].clients;
        console.log('Sending client list: ', clients)
        socket.emit('RECEIVE_CLIENT_LIST', clients);
        socket
            .broadcast
            .to('board-'+sessionId)
            .emit('RECEIVE_CLIENT_LIST', clients);
    }
};

const deletePost = (data, socket) => {
    const existingData = sessions[data.sessionId];
    if (existingData) {
        existingData.posts = existingData.posts.filter(p => p.id !== data.id);
        sessions[data.sessionId] = existingData;
        socket
            .broadcast
            .to('board-'+data.sessionId)
            .emit('RECEIVE_DELETE_POST', data);
    }
};

const like = (data, socket) => {
    const existingData = sessions[data.post.sessionId];
    if (existingData) {
        const post = find(existingData.posts, p => p.id === data.post.id);
        if (post) {
            post.votes += data.count;
            socket
                .broadcast
                .to('board-'+data.post.sessionId)
                .emit('RECEIVE_LIKE', data);
        }
    }
};
