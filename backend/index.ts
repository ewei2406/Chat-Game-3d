import { Socket } from "socket.io";

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('../frontend/dist'))

let id = 0
const generateId = () => {
    id++
    return id
}

type PlayerData = {
    id: string
    pos: number[]
    rot: number[]
    timestamp: number
    nickname: string
}
const currentPlayers: { [id: string]: PlayerData } = {};

io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.on('playerDataUp', (msg: PlayerData) => {
        console.log(msg)
        currentPlayers[msg.id] = {...msg, timestamp: Date.now() }
    })
})

setInterval(() => {
    io.emit('playerDataDown', Object.values(currentPlayers))

    const now = Date.now()
    for (const p in currentPlayers) {
        if (now - currentPlayers[p].timestamp > 50000) {
            delete currentPlayers[p]
        }
    }
}, 1000 / 30)

app.get('/generateId', (req: any, res: any ) => {
    const newId = generateId()
    console.log(newId)
    res.json(newId)
})

const PORT = process.env.PORT || 3001


server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})