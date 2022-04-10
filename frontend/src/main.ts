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
import Cube from "./Object/Cube"
import Message from "./Message/MessageType"
import TextEntity from "./Entity/TextEntity"
import MakeTree from "./Object/MakeTree"
import MakeHouse from "./Object/MakeHouse"
import MakeFlower from "./Object/MakeFlower"

const canvas = new Canvas('display')
canvas.text(40, 10, "LOADING...", 10)
info(["LOADING..."])
const input = new Input(canvas)
const camera = new Camera(canvas, -10, -1, -10)
const origin = new Entity(0, 0, 0)

const worldObjs: Array<{ draw: (camera: Camera) => void }> = []

const K = 2 ** 17
const lcong_randnum = (i: number, num = 1000) => {
    for (let a = 0; a < (i % 10000); a++) {
        num = ((num * 24693) + 3517) % K
    }
    return num / K
}
worldObjs.push(new Cube(20, 230, 20, 30, 30, 30, 'yellow', 5))
for (let i = 100; i < 200; i += 10) {
    worldObjs.push(new Cube((lcong_randnum(i) - 0.5) * 300, 90 + (lcong_randnum(i + 1) - 0.5) * 20, (lcong_randnum(i + 1) - 0.5) * 300, 30, 10, 30, 'white', 2))
}

for (let i = 1000; i < 10000; i += 2) {
    worldObjs.push(new Point(
        (lcong_randnum(i) - 0.5) * 200, 0, (lcong_randnum(i + 1) - 0.5) * 200, 1, 'green'))
}

for (let i = 0; i < 100; i += 2) {
    worldObjs.push(...MakeFlower((lcong_randnum(i) - 0.5) * 200, 0, (lcong_randnum(i + 1) - 0.5) * 200, 'red'))
}
for (let i = 100; i < 200; i += 2) {
    worldObjs.push(...MakeFlower((lcong_randnum(i) - 0.5) * 200, 0, (lcong_randnum(i + 1) - 0.5) * 200, 'yellow'))
}

worldObjs.push(...MakeTree(10, 0, 10, 8, 5, 5))
worldObjs.push(...MakeTree(30, 0, 50, 6, 5, 4))
worldObjs.push(...MakeTree(30, 0, 50, 6, 5, 3))
worldObjs.push(...MakeTree(-30, 0, -50, 3, 10, 4))
// worldObjs.push(...MakeTree(30, 0, -50, 3, 30, 5))
worldObjs.push(...MakeTree(-10, 0, 10, 1, 4, 4))
worldObjs.push(...MakeHouse(60, 0, 10, 7.5, 5, 5, 4))
worldObjs.push(...MakeHouse(-80, 0, 50, 5, 5, 5, 10))
worldObjs.push(...MakeHouse(40, 0, -50, 0.5, 5, 5, 5))
worldObjs.push(...MakeTree(45, 0, -50, 0.5, 5, 5))



const connection = new Connection(() => {
    console.log("Connected!")
    const player = new Player(0, 0, 0, 0, 0, 0, connection.id)
    let prev = player.toPlayerData()
    connection.sendPlayerData(player);

    // nickname
    (document.getElementById('nickname') as HTMLInputElement).value = player.nickname;
    (document.getElementById('nickname') as HTMLInputElement).onkeyup = (e: KeyboardEvent) => {
        player.nickname = (e.target as HTMLInputElement).value
    }
    // FOV
    (document.getElementById('FOVSlider') as HTMLInputElement).value = camera.f.toString();
    (document.getElementById('FOVSlider') as HTMLInputElement).oninput = (e: Event) => {
        camera.f = Number((e.target as HTMLInputElement).value)
    }
    // RenderSlider
    (document.getElementById('renderSlider') as HTMLInputElement).oninput = (e: Event) => {
        camera.far = Number((e.target as HTMLInputElement).value)
    }
    // Reset
    (document.getElementById('reset') as HTMLButtonElement).onclick = (e: Event) => {
        camera.f = 256
        camera.far = 300;
        (document.getElementById('renderSlider') as HTMLInputElement).value = "300";
        (document.getElementById('FOVSlider') as HTMLInputElement).value = "256";
    }
    // Chat
    (document.getElementById('sendMessage') as HTMLInputElement).onkeyup = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            const msg = (e.target as HTMLInputElement).value
            connection.sendMessage(msg, player);

            messageEntities.push(new TextEntity(
                player.position.getX(),
                player.position.getY(),
                player.position.getZ(),
                msg
            ));

            (document.getElementById('sendMessage') as HTMLInputElement).value = ""
        }
    }

    // Handle other players
    let otherPlayers: { [id: string]: Player } = {};
    connection.onRecievePlayerData(pd => {
        // let self = pd.find(playerData => playerData.id === connection.id)
        // if (!self) {
        //     window.confirm("You have been disconnected for inactivity.")
        //     window.location.reload();
        // }
        pd = pd.filter(playerData => playerData.id !== connection.id)

        for (const p in otherPlayers) {
            if (!pd.find(playerData => playerData.id == p)) {
                delete otherPlayers[p]
            }
        }

        pd.map(playerData => {
            if (playerData.id in otherPlayers) {
                otherPlayers[playerData.id].updateByData(playerData)
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

    let messages: Message[] = []
    let messageEntities: TextEntity[] = []
    connection.onRecieveMessage(msg => {
        console.log(msg)
        const sentPlayer = otherPlayers[msg.playerId]
        console.log(msg.playerId.toString(), otherPlayers)
        if (sentPlayer) {
            messageEntities.push(new TextEntity(
                sentPlayer.position.getX(),
                sentPlayer.position.getY(),
                sentPlayer.position.getZ(),
                msg.contents
            ))
        }
        messages.push(msg);
        (document.getElementById('chatBox') as HTMLElement).innerHTML = messages.map(m => 
            `[${m.timestamp.toString()}] ${m.nickname} (id:${m.playerId}): ${m.contents}`).join("<br/>");
    })

    let t0 = Date.now()
    let count = 0

    const main = () => {
        // Update
        // player.clearV()
        // player.clearV_R()

        player.updateInput(input)
        player.update()
        input.update()

        camera.track(player)
        camera.update()
        messageEntities = messageEntities.filter(m => m.update())

        // Draw
        canvas.clear()

        worldObjs.map(p => p.draw(camera))
        // origin.drawAxis(camera)
        Object.values(otherPlayers).forEach(k => {
            k.draw(camera)
            k.drawName(camera)
        })

        messageEntities.forEach(m => m.draw(camera))
        console.log(messageEntities.length)
        origin.drawAxis(camera)
        // Communicate

        let dt = Date.now() - t0
        info(['FPS: ' + Math.round(1000 / dt).toString().slice(0, 3), 'Players connected: ' + (Object.keys(otherPlayers).length + 1).toString()])
        t0 = Date.now()

        count += dt
        if (count >= 1000 / 30) {
            if (!player.isEqualToData(prev)) connection.sendPlayerData(player)
            prev = player.toPlayerData()
            count = 0
        }
    }

    setInterval(main, 1000 / 60)
})



