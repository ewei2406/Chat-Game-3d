import { io, Socket } from "socket.io-client";
import Player from "../Entity/Player";
import axios from "axios"
import PlayerData from "../Entity/PlayerData";
import Message from "../Message/MessageType";

class Connection {
    socket!: Socket
    id!: string
    nickname!: string

    constructor(onReady: () => void) {
        axios.get('/generateId').then(res => {
            this.id = res.data
            this.nickname = `Player ${this.id}`
        }).then(r => {
            this.socket = io()
            this.socket.on('connect', () => {
                console.log("Established connection")
                onReady()
            })
        })
    }

    sendPlayerData(player: Player) {
        this.socket.emit('playerDataUp', player.toPlayerData())
    }

    onRecievePlayerData(callback: (playerData: PlayerData[]) => any) {
        this.socket.on('playerDataDown', (pd) => callback(pd))
    }

    sendMessage(message: string, player: Player) {
        this.socket.emit('messageUp', { playerId: player.id, nickname: player.nickname, contents: message })
    }

    onRecieveMessage(callback: (message: Message) => any) {
        this.socket.on('messageDown', (pd) => callback(pd))
    }
}

export default Connection