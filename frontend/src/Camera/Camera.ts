import Canvas from "../Canvas/Canvas";
import Entity from "../Entity/Entity";
import Matrix from "../Matrix/Matrix";
import TransformMatrix from "../Matrix/TransformMatrix";
import ZeroMatrix from "../Matrix/ZeroMatrix";
import Point from "../Point/Point";
import PositionPoint from "../Point/PositionPoint";
import RotationPoint from "../Point/RotationPoint";

class Camera {

    M!: Matrix
    canvas: Canvas
    near=1
    far=100
    f=256
    p_x: number
    p_y: number
    position: PositionPoint
    rotation: RotationPoint

    rotationOffset = new RotationPoint(0, 0, 0)

    constructor(canvas: Canvas, x: number, y: number, z: number) {
        this.position = new PositionPoint(x, y, z)
        this.rotation = new RotationPoint(0, 0, 0)

        this.canvas = canvas
        this.p_x = this.canvas.canvas.width / 2
        this.p_y = this.canvas.canvas.height / 2

        this.updateM()
    }

    updateM() {
        const K = new Matrix([
            [this.f, 0, this.p_x],
            [0, this.f, this.p_y],
            [0, 0, 1]
        ])

        const yaw = this.rotation.getYaw()
        const y1 = -Math.cos(yaw)
        const y2 = Math.sin(yaw)
        const R_yaw = new Matrix([
            [y1, y2, 0],
            [-y2, y1, 0],
            [0, 0, 1]
        ])

        const pitch = this.rotation.getPitch()
        const p1 = Math.sin(pitch)
        const p2 = Math.cos(pitch)
        const R_pitch = new Matrix([
            [p1, 0, -p2],
            [0, 1, 0],
            [p2, 0, p1]
        ])
    
        const roll = this.rotation.getRoll()
        const r1 = Math.cos(roll)
        const r2 = Math.sin(roll)
        const R_roll = new Matrix([
            [1, 0, 0],
            [0, r1, -r2],
            [0, r2, r1],
        ])

        const R = R_roll.multiply(R_yaw).multiply(R_pitch)

        const I_C = new Matrix([
            [1, 0, 0, - this.position.getX()],
            [0, 1, 0, - this.position.getY()],
            [0, 0, 1, - this.position.getZ()],
        ])

        this.M = K.multiply(R.multiply(I_C))
    }

    update(): void {
        this.updateM()
    }


    track(e: Entity) {
        this.position = e.position
        this.rotation = e.rotation
        this.updateM()
    }

    mapPoint(point: Point) {
        const embedding =  this.M.multiply(point)
        if (embedding.getValue(2, 0) < this.far && embedding.getValue(2, 0) > this.near) {
            embedding.multiplyCol(0, 1 / embedding.getValue(2, 0))
            return embedding
        }
        return null
    }

    toString() {
        return `
            Position: ${this.position.toString()}
            Rotation: ${this.rotation.toString()}
        `
    }

}

export default Camera