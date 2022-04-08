import PositionPoint from "../Point/PositionPoint";
import RotationPoint from "../Point/RotationPoint";
import Matrix from "./Matrix";

class TransformMatrix {

    position: PositionPoint
    rotation: RotationPoint

    I_C!: Matrix
    T!: Matrix

    constructor(position: PositionPoint, rotation: RotationPoint) {
        this.position = position
        this.rotation = rotation

        this.updateI_C()
        this.updateMat()
    }

    updateI_C(factor=1) {
        this.I_C = new Matrix([
            [1, 0, 0, factor * this.position.getX()],
            [0, 1, 0, factor * this.position.getY()],
            [0, 0, 1, factor * this.position.getZ()],
        ])
    }

    updateMat(factor=1) {

        this.updateI_C(factor)

        const yaw = this.rotation.getYaw()
        const y1 = Math.cos(yaw)
        const y2 = Math.sin(yaw)
        const R_yaw = new Matrix([
            [y1, -y2, 0],
            [y2, y1, 0],
            [0, 0, 1]
        ])

        const pitch = this.rotation.getPitch()
        const p1 = Math.sin(pitch)
        const p2 = Math.cos(pitch)
        const R_pitch = new Matrix([
            [p2, 0, p1],
            [0, 1, 0],
            [-p1, 0, p2]
        ])

        const roll = this.rotation.getRoll()
        const r1 = Math.cos(roll)
        const r2 = Math.sin(roll)
        const R_roll = new Matrix([
            [1, 0, 0],
            [0, r1, -r2],
            [0, r2, r1],
        ])

        const R = R_yaw.multiply(R_roll).multiply(R_pitch)

        this.T = R.multiply(this.I_C)
    }
}

export default TransformMatrix