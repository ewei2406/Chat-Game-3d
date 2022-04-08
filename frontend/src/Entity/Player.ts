import Input from "../Input/Input";
import TransformMatrix from "../Matrix/TransformMatrix";
import PositionPoint from "../Point/PositionPoint";
import RotationPoint from "../Point/RotationPoint";
import ColumnVector from "../Vector/ColumnVector";
import Entity from "./Entity";
import PlayerData from "./PlayerData";

class Player extends Entity {

    V: PositionPoint
    V_R: RotationPoint

    constructor(x: number, y: number, z: number, yaw: number, pitch: number, roll: number, id="-1") {
        super(x, y, z, yaw, pitch, roll, id)
        this.V = new PositionPoint(0, 0, 0, 0)
        this.V_R = new RotationPoint(0, 0, 0, 0)
        this.nickname = `Player ${id}`
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
        if (input.RIGHT) this.moveSide(0.5)
        if (input.LEFT) this.moveSide(-0.5)
        if (input.FORWARD) this.moveForward(0.5)
        if (input.BACKWARD) this.moveForward(-0.5)
        if (input.UP) this.moveUp(0.5)
        if (input.DOWN) this.moveUp(-0.5)

        // if (input.A_UP) this.rotateVertical(-0.01)
        // if (input.A_DOWN) this.rotateVertical(0.01)
        // if (input.A_RIGHT) this.rotateHorizontal(0.01)
        // if (input.A_LEFT) this.rotateHorizontal(-0.01)

        this.rotateHorizontal(input.MOUSE_X_FRAME / 1000)
        this.rotateVertical(input.MOUSE_Y_FRAME / 1000)
    }

    update(V=this.V, V_R=this.V_R): boolean {
        if (V.isZero() && V_R.isZero()) return false
        this.rotation.add(V_R) 
        if (this.rotation.getRoll() > Math.PI / 2) {
            this.rotation.setRoll(Math.PI / 2)
        }
        if (this.rotation.getRoll() < -Math.PI / 2) {
            this.rotation.setRoll(-Math.PI / 2)
        }

        const dV = V.clone()
        const cos_R = Math.cos(this.rotation.getPitch())
        const sin_R = Math.sin(this.rotation.getPitch())
        const dX = dV.getX() * cos_R - dV.getZ() * sin_R
        const dZ = dV.getX() * sin_R + dV.getZ() * cos_R
        dV.setX(dX)
        dV.setZ(dZ)
        dV.setValue(3, 0)
        this.position.add(dV)
        return true
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