import { Socket } from "socket.io";

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('dist'))

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

type Message = {
    playerId: number
    nickname: string
    timestamp: Date
    contents: string
}

io.on('connection', (socket: Socket) => {

    socket.on('playerDataUp', (msg: PlayerData) => {
        currentPlayers[msg.id] = {...msg, timestamp: Date.now() }
    })

    socket.on('messageUp', (msg: Message) => {
        io.emit('messageDown', {...msg,
            timestamp: (new Date().toLocaleTimeString() as string),
        })
    })
})

setInterval(() => {
    io.emit('playerDataDown', Object.values(currentPlayers))

    const now = Date.now()
    for (const p in currentPlayers) {
        if (now - currentPlayers[p].timestamp > 100000) {
            delete currentPlayers[p]
        }
    }
}, 1000 / 30)

app.get('/generateId', (req: any, res: any ) => {
    const newId = generateId()
    res.json(newId)
})

app.get('/favicon', (req: any, res: any) => {
    res.send('./favicon.ico')
})

const PORT = process.env.PORT || 3001


server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})