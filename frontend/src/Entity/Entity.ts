import Camera from "../Camera/Camera"
import Edge from "../Edge/Edge"
import TransformMatrix from "../Matrix/TransformMatrix"
import WorldObject from "../Object/WorldObject"
import BoundingPoint from "../Point/BoundingPoint"
import Point from "../Point/Point"
import PositionPoint from "../Point/PositionPoint"
import RotationPoint from "../Point/RotationPoint"
import ColumnVector from "../Vector/ColumnVector"

class Entity implements WorldObject {
    axis_X = new Edge(new Point(0, 0, 0), new Point(5, 0, 0), "red")
    axis_Y = new Edge(new Point(0, 0, 0), new Point(0, 5, 0), "green")
    axis_Z = new Edge(new Point(0, 0, 0), new Point(0, 0, 5), "blue")
    pointer = new Edge(new Point(0, 0, 0), new Point(5, 0, 0), "purple")

    position: PositionPoint
    rotation: RotationPoint
    hitbox: BoundingPoint
    
    id: string
    nickname: string

    constructor(x: number, y: number, z: number, yaw=0, pitch=0, roll=0, id="-1") {
        this.position = new PositionPoint(x, y, z)
        this.rotation = new RotationPoint(yaw, pitch, roll)
        this.hitbox = new BoundingPoint(10, 20, 10)
        this.id = id
        this.nickname = `Entity ${id}`
    }

    update() {
        return true
    }

    drawAxis(camera: Camera) {
        const t_0 = this.position.getTranslateMatrix(1)
        const t_1 = this.rotation.getRotationMatrix()
        this.axis_X.transform(t_1).transform(t_0).draw(camera)
        this.axis_Y.transform(t_1).transform(t_0).draw(camera)
        this.axis_Z.transform(t_1).transform(t_0).draw(camera)
    }

    drawPointer(camera: Camera) {
        const t_0 = this.position.getTranslateMatrix(1)
        const t_1 = this.rotation.getRotationMatrix()
        this.pointer.transform(t_1).transform(t_0).draw(camera)
    }

    drawName(camera: Camera) {
        const [embedding, scale] = camera.mapPoint(this.position.clone().setY(this.position.getY() + 3))
        if (embedding) {
            camera.canvas.text(embedding.getValue(0, 0), embedding.getValue(1, 0), this.nickname, 2 * (scale as number))
        }
    }

    draw(camera: Camera) {

    }

    toString() {
        return`
            Position: ${this.position.toString()}
            Rotation: ${this.rotation.toString()}
        `
    }
}

export default Entity