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
import Connection from "./Service/Connection"
import PlayerData from "./Entity/PlayerData"

const canvas = new Canvas('display')
const input = new Input(canvas)
const camera = new Camera(canvas, -10, -1, -10)

const pts: Array<Point> = []
for (let x = -50; x <= 50; x += 10) {
    for (let y = -50; y <= 50; y += 10) {
        for (let z = -50; z <= 50; z += 10) {
            pts.push(new Point(x, y, z))
        }
    }
}


const connection = new Connection(() => {
    console.log("Connected!")
    const player = new Player(0, 0, 0, 0, 0, 0, connection.id)
    let prev = player.toPlayerData()
    connection.sendPlayerData(player);
    (document.getElementById('nickname') as HTMLInputElement).value = player.nickname

    // nickname
    const handleNicknameChange = (e: Event) => {
        player.nickname = (document.getElementById('nickname') as HTMLInputElement).value;
        console.log("awdawdwadawdawd")
    }

    
    (document.getElementById('nickname') as HTMLInputElement).onkeyup = (e: KeyboardEvent) => {
        player.nickname = (e.target as HTMLInputElement).value
    }

    // Handle other players
    let otherPlayers: { [id: string]: Player } = {};
    connection.onRecievePlayerData(pd => {
        let self = pd.find(playerData => playerData.id === connection.id)
        if (!self) {
            window.confirm("You have been disconnected for inactivity.")
            window.location.reload();
        }
        pd = pd.filter(playerData => playerData.id !== connection.id)

        for (const p in otherPlayers) {
            if (!pd.find(playerData => playerData.id == p)) {
                delete otherPlayers[p]
            }
        }

        pd.map(playerData => {
            if (playerData.id in otherPlayers) {
                otherPlayers[playerData.id].updateByData(playerData)
                otherPlayers[playerData.id].updateAxis()
            } else {
                otherPlayers[playerData.id] = new Player(
                    playerData.pos[0],
                    playerData.pos[1],
                    playerData.pos[2],
                    playerData.rot[0],
                    playerData.rot[1],
                    playerData.rot[2],
                    playerData.id
                )
            }
            if (playerData.nickname) otherPlayers[playerData.id].nickname = playerData.nickname
        })
    })

    let t0 = Date.now()
    const main = () => {
        // Update
        player.clearV()
        player.clearV_R()

        player.updateInput(input)
        player.update()
        input.update()

        camera.track(player)
        camera.update()

        // Communicate
        let dt = Date.now() - t0
        if (dt >= 1000/30) {
            if (!player.isEqualToData(prev)) connection.sendPlayerData(player)
            prev = player.toPlayerData()
            t0 = Date.now()
        }

        // Draw
        canvas.clear()
        pts.map(p => p.draw(camera))
        // origin.drawAxis(camera)
        Object.values(otherPlayers).forEach(k => {
            k.drawAxis(camera)
            k.drawName(camera)
        })
        // e1.drawAxis(camera)

        // info([camera.toString(), player.toString()])
    }


    setInterval(main, 1000 / 60)
})



