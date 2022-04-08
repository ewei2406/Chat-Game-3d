import Matrix from "../Matrix/Matrix";
import Point from "./Point";

class RotationPoint extends Point {

    constructor(yaw: number, pitch: number, roll: number, norm=1) {
        super(yaw, pitch, roll, norm)
    }

    getYaw() {
        return this.getValue(0)
    }

    getPitch() {
        return this.getValue(1)
    }

    getRoll() {
        return this.getValue(2)
    }

    setYaw(yaw: number) {
        return this.setValue(0, yaw)
    }

    setPitch(pitch: number) {
        return this.setValue(1, pitch)
    }

    setRoll(roll: number) {
        return this.setValue(2, roll)
    }

    addYaw(yaw: number) {
        return this.addValue(0, yaw)
    }

    addPitch(pitch: number) {
        return this.addValue(1, pitch)
    }

    addRoll(roll: number) {
        return this.addValue(2, roll)
    }

    getRotationMatrix() {
        const yaw = this.getYaw()
        const y1 = Math.cos(yaw)
        const y2 = Math.sin(yaw)
        const R_yaw = new Matrix([
            [y1, -y2, 0],
            [y2, y1, 0],
            [0, 0, 1]
        ])

        const pitch = this.getPitch()
        const p1 = Math.sin(pitch)
        const p2 = Math.cos(pitch)
        const R_pitch = new Matrix([
            [p2, 0, p1],
            [0, 1, 0],
            [-p1, 0, p2]
        ])

        const roll = this.getRoll()
        const r1 = Math.cos(roll)
        const r2 = Math.sin(roll)
        const R_roll = new Matrix([
            [1, 0, 0],
            [0, r1, -r2],
            [0, r2, r1],
        ])

        const R = R_yaw.multiply(R_roll).multiply(R_pitch)
        R.addCol([0, 0, 0])
        return R
    }

    clone() {
        return new RotationPoint(this.getYaw(), this.getPitch(), this.getRoll())
    }
}

export default RotationPoint