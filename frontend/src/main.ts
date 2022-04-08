import Matrix from "./Matrix/Matrix"
import Camera from "./Camera/Camera"
import Point from "./Point/Point"
import Canvas from "./Canvas/Canvas"
import Input from "./Input/Input"
import Edge from "./Edge/Edge"
import Entity from "./Entity/Entity"
import info from "./info"
import Player from "./Entity/Player"
import RotationPoint from "./Point/RotationPoint"
import { io } from "socket.io-client";

const socket = io()
socket.on('connect', () => {
    console.log('connected')
})

const canvas = new Canvas('display')
const input = new Input(canvas)
const camera = new Camera(canvas, -10, -1, -10)

const pts: Array<Point> = []
for (let x = -20; x <= 20; x += 5) {
    for (let y = -20; y <= 20; y += 5) {
        for (let z = -20; z <= 20; z += 5) {
            pts.push(new Point(x, y, z))
        }
    }
}

const origin = new Entity(0, 0, 0)
const e1 = new Entity(10, 10, 10, 0.5, 0, 0)
const dr = new RotationPoint(0, 0, 0)
const player = new Player(0, 0, 0)

const main = () => {

    // Update
    player.clearV()
    player.clearV_R()

    player.updateInput(input)
    player.updateRotation()
    player.updatePosition()
    input.update()

    camera.track(player)
    camera.update()

    // Draw
    canvas.clear()
    pts.forEach(p => p.draw(camera))
    origin.drawAxis(camera)
    e1.drawAxis(camera)

    info([camera.toString(),player.toString()])
}


setInterval(main, 1000 / 60)
