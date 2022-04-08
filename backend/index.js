"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static('../frontend/dist'));
let id = 0;
const generateId = () => {
    id++;
    return id;
};
const currentPlayers = {};
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('playerDataUp', (msg) => {
        console.log(msg);
        currentPlayers[msg.id] = Object.assign(Object.assign({}, msg), { timestamp: Date.now() });
    });
});
setInterval(() => {
    io.emit('playerDataDown', Object.values(currentPlayers));
    const now = Date.now();
    for (const p in currentPlayers) {
        if (now - currentPlayers[p].timestamp > 50000) {
            delete currentPlayers[p];
        }
    }
}, 1000 / 30);
app.get('/generateId', (req, res) => {
    const newId = generateId();
    console.log(newId);
    res.json(newId);
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
