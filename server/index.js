import express from 'express';
import path from 'path';
import socketIo from 'socket.io';
import http from 'http';

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const port = process.env.PORT || 8081;
const htmlFile = path.resolve(__dirname, '..', 'static', 'index.html');
const staticFolder = path.resolve(__dirname, '..', 'static');

console.log('Static folder: ', staticFolder);

app.use('/assets', express.static(staticFolder));
app.get('/*', (req, res) => res.sendFile(htmlFile));


io.on('connection', socket => {
    console.log('a user connected on socket '+socket.id);

    socket.on('action', action => {
        console.log(action);
    });

});



httpServer.listen(port);
console.log('Server started on port ' + port);
