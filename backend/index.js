"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static('../frontend/dist'));
io.on('connection', (socket) => {
    console.log('a user connected');
});
const PORT = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send("Hello world");
});
server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
