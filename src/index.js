const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);




require('./socket')(io);

app.use(express.static(path.join(__dirname, '/public')));



server.listen(PORT, () => {
    console.log('server on in port', PORT);
});