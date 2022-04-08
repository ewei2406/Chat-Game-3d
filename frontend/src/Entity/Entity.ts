import Camera from "../Camera/Camera"
import Edge from "../Edge/Edge"
import TransformMatrix from "../Matrix/TransformMatrix"
import Point from "../Point/Point"
import PositionPoint from "../Point/PositionPoint"
import RotationPoint from "../Point/RotationPoint"
import ColumnVector from "../Vector/ColumnVector"

class Entity {
    axis_X!: Edge
    axis_Y!: Edge
    axis_Z!: Edge

    position: PositionPoint
    rotation: RotationPoint

    constructor(x: number, y: number, z: number, yaw=0, pitch=0, roll=0) {
        this.position = new PositionPoint(x, y, z)
        this.rotation = new RotationPoint(yaw, pitch, roll)
        this.updateAxis()
    }

    update() {
        this.updateAxis()
    }

    updateAxis() {
        const origin = new Point(0, 0, 0)
        const t_0 = this.position.getTranslateMatrix(1)
        const t_1 = this.rotation.getRotationMatrix()
        this.axis_X = new Edge(origin, new Point(5, 0, 0), "red").transform(t_1).transform(t_0)
        this.axis_Y = new Edge(origin, new Point(0, 5, 0), "green").transform(t_1).transform(t_0)
        this.axis_Z = new Edge(origin, new Point(0, 0, 5), "blue").transform(t_1).transform(t_0)
    }

    drawAxis(camera: Camera) {
        this.axis_X.draw(camera)
        this.axis_Y.draw(camera)
        this.axis_Z.draw(camera)
    }

    toString() {
        return`
            Position: ${this.position.toString()}
            Rotation: ${this.rotation.toString()}
        `
    }
}

export default Entity