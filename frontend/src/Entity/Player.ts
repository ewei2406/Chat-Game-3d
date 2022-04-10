import Camera from "../Camera/Camera";
import Edge from "../Edge/Edge";
import Input from "../Input/Input";
import TransformMatrix from "../Matrix/TransformMatrix";
import Point from "../Point/Point";
import PositionPoint from "../Point/PositionPoint";
import RotationPoint from "../Point/RotationPoint";
import ColumnVector from "../Vector/ColumnVector";
import Entity from "./Entity";
import PlayerData from "./PlayerData";

class Player extends Entity {

    dispEdges: Edge[]

    V: PositionPoint
    A: PositionPoint
    V_R: RotationPoint

    constructor(x: number, y: number, z: number, yaw: number, pitch: number, roll: number, id="-1") {
        super(x, y, z, yaw, pitch, roll, id)

        const K = 2 ** 17
        const lcong_randnum = (i: number, num = 1000) => {
            for (let a = 0; a < (i % 1000); a++) {
                num = ((num * 24693) + 3517) % K
            }
            return num / K
        }

        const color = "#" + Math.round(4000 * lcong_randnum(Number(id))).toString(16).slice(0,4)
        this.dispEdges = [
            new Edge(new Point(-2, 0, 0), new Point(2, 0, 0), color, 1),
            new Edge(new Point(0, -2, 0), new Point(0, 2, 0), color, 1),
            new Edge(new Point(0, 0, -2), new Point(0, 0, 2), color, 1)
        ]



        this.V = new PositionPoint(0, 0, 0, 0)
        this.A = new PositionPoint(0, -0.06, 0, 0)
        this.V_R = new RotationPoint(0, 0, 0, 0)
        this.nickname = `Player ${id}`
    }

    draw(camera: Camera): void {
        const t_0 = this.position.getTranslateMatrix(1)
        const t_1 = this.rotation.getRotationMatrix()
        this.dispEdges.forEach(edge => edge.transform(t_1).transform(t_0).draw(camera))
    }

    moveForward(d: number) {
        this.V.setX(d)
    }

    moveSide(r: number) {
        this.V.setZ(r)
    }

    moveUp(up: number) {
        this.V.setY(up)
    }

    rotateHorizontal(pitch: number) {
        this.V_R.setPitch(pitch)
    }

    rotateVertical(roll: number) {
        this.V_R.setRoll(roll)
    }

    clearV() {
        this.V.zero()
    }

    clearV_R() {
        this.V_R.zero()
    }

    updateInput(input: Input) {
        if (input.RIGHT) this.V.setZ(1)
        else if (input.LEFT) this.V.setZ(-1)
        else this.V.setZ(0)

        if (input.FORWARD) this.V.setX(1)
        else if (input.BACKWARD) this.V.setX(-1)
        else this.V.setX(0)

        if (input.UP && this.position.getY() === 10) this.V.setY(1.2)

        // else this.moveUp(0)
        // if (input.DOWN) this.moveUp(-0.5)

        // if (input.A_UP) this.rotateVertical(-0.01)
        // if (input.A_DOWN) this.rotateVertical(0.01)
        // if (input.A_RIGHT) this.rotateHorizontal(0.01)
        // if (input.A_LEFT) this.rotateHorizontal(-0.01)

        this.V_R.setPitch(input.MOUSE_X_FRAME / 1000)
        this.V_R.setRoll(input.MOUSE_Y_FRAME / 1000)
        this.rotation.add(this.V_R) 

        if (this.rotation.getRoll() > Math.PI / 2) {
            this.rotation.setRoll(Math.PI / 2)
        }
        if (this.rotation.getRoll() < -Math.PI / 2) {
            this.rotation.setRoll(-Math.PI / 2)
        }
    }

    update(): boolean {
        const dV = this.V.clone()

        const cos_R = Math.cos(this.rotation.getPitch())
        const sin_R = Math.sin(this.rotation.getPitch())
        const dX = dV.getX() * cos_R - dV.getZ() * sin_R
        const dZ = dV.getX() * sin_R + dV.getZ() * cos_R
        dV.setX(dX)
        dV.setZ(dZ)
        dV.setValue(3, 0)

        this.position.add(dV)
        this.V.add(this.A)
        if (this.position.getY() < 10) {
            this.position.setY(10)
        }
        return this.V.isZero()
    }

    toPlayerData(): PlayerData {
        return { id: this.id, pos: this.position.squeeze(), rot: this.rotation.squeeze(), nickname: this.nickname }
    }

    incrementX() {
        this.position.addValue(0, 1)
    }

    updateByData(data: PlayerData) {
        // console.log(data.pos[0])
        this.position.setX(data.pos[0])
        this.position.setY(data.pos[1])
        this.position.setZ(data.pos[2])
        this.rotation.setYaw(data.rot[0])
        this.rotation.setPitch(data.rot[1])
        this.rotation.setRoll(data.rot[2])
    }

    isEqualToData(other: PlayerData) {
        return (this.position.getX() === other.pos[0]) &&
            (this.position.getY() === other.pos[1]) &&
            (this.position.getZ() === other.pos[2]) &&
            (this.rotation.getYaw() === other.rot[0]) &&
            (this.rotation.getPitch() === other.rot[1]) &&
            (this.rotation.getRoll() === other.rot[2])
    }
}

export default Player