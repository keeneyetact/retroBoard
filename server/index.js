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
    sessions[id] = {
        well: [],
        notWell: [],
        improve: []
    };
    return res.json({
        id
    });
});

app.get('/*', (req, res) => res.sendFile(htmlFile));


io.on('connection', socket => {
    console.log('a user connected on socket '+socket.id);

    socket.on('action', action => {
        console.log(action);
        switch (action.type) {
            case 'server/ADD_POST':
                receivePost(action.data, io);
                break;
            case 'server/JOIN_SESSION':
                joinSession(action.data, socket);
                break;
            default:
                console.warn('Unhandled action: ', action.type);
        }

    });

});



httpServer.listen(port);
console.log('Server started on port ' + port);

const receivePost = (data, io) => {
    sessions[data.sessionId][data.postType].push({
        content: data.content,
        user: data.user
    });

    io.to('board-'+data.sessionId).emit({
        type: 'server/RECEIVE_POST',
        data
    });
};

const joinSession = (data, socket) => {
    socket.join('board-' + data.sessionId);
};
