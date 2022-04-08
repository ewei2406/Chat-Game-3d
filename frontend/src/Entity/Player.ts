import Input from "../Input/Input";
import TransformMatrix from "../Matrix/TransformMatrix";
import PositionPoint from "../Point/PositionPoint";
import RotationPoint from "../Point/RotationPoint";
import ColumnVector from "../Vector/ColumnVector";
import Entity from "./Entity";

class Player extends Entity {

    V: PositionPoint
    V_R: RotationPoint

    constructor(x: number, y: number, z: number) {
        super(x, y, z)
        this.V = new PositionPoint(0, 0, 0, 0)
        this.V_R = new RotationPoint(0, 0, 0, 0)
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

    updateRotation() {
        this.rotation.add(this.V_R) 
        return this.V_R
    }

    updatePosition() {
        const dV = this.V.clone()
        const cos_R = Math.cos(this.rotation.getPitch())
        const sin_R = Math.sin(this.rotation.getPitch())
        const dX = dV.getX() * cos_R - dV.getZ() * sin_R
        const dZ = dV.getX() * sin_R + dV.getZ() * cos_R
        dV.setX(dX)
        dV.setZ(dZ)
        dV.setValue(3, 0)
        this.position.add(dV)
        return dV
    }
}

export default Player