import express from 'express';
import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import uuid from 'node-uuid';

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const port = process.env.PORT || 8081;
const htmlFile = path.resolve(__dirname, '..', 'static', 'index.html');
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
});



httpServer.listen(port);
console.log('Server started on port ' + port);

const receivePost = (data, socket) => {
    if (!sessions[data.sessionId]) {
        sessions[data.sessionId] = {
            well: [],
            notWell: [],
            improve: []
        };
    }
    sessions[data.sessionId][data.postType].push({
        content: data.content,
        user: data.user
    });

    socket
        .broadcast
        .to('board-'+data.sessionId)
        .emit('RECEIVE_POST', data);
};

const joinSession = (data, socket) => {
    socket.join('board-' + data.sessionId);
    const existingData = sessions[data.sessionId];
    if (existingData) {
        socket.emit('RECEIVE_BOARD', existingData);
    }
};
