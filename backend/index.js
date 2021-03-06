"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static('dist'));
let id = 0;
const generateId = () => {
    id++;
    return id;
};
const currentPlayers = {};
io.on('connection', (socket) => {
    socket.on('playerDataUp', (msg) => {
        currentPlayers[msg.id] = Object.assign(Object.assign({}, msg), { timestamp: Date.now() });
    });
    socket.on('messageUp', (msg) => {
        io.emit('messageDown', Object.assign(Object.assign({}, msg), { timestamp: new Date().toLocaleTimeString() }));
    });
});
setInterval(() => {
    io.emit('playerDataDown', Object.values(currentPlayers));
    const now = Date.now();
    for (const p in currentPlayers) {
        if (now - currentPlayers[p].timestamp > 100000) {
            delete currentPlayers[p];
        }
    }
}, 1000 / 30);
app.get('/generateId', (req, res) => {
    const newId = generateId();
    res.json(newId);
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
