import Camera from "../Camera/Camera";
import Matrix from "../Matrix/Matrix";
import TransformMatrix from "../Matrix/TransformMatrix";
import ColumnVector from "../Vector/ColumnVector";

class Point extends ColumnVector {
    color: string
    size: number
    constructor(x: number, y: number, z: number, norm=1, color="black", size=0.5) {
        super([x, y, z, norm])
        this.color = color
        this.size = size
    }

    getValue(r: number): number {
        return super.getValue(r, 0)
    }

    setValue(r: number, value: number) {
        return super.setValue(r, 0, value)
    }

    addValue(r: number, value: number) {
        return super.addValue(r, 0, value)
    }

    draw(camera: Camera) {
        const [embedding, scale] = camera.mapPoint(this)
        if (embedding) {
            camera.canvas.point(embedding.getValue(0, 0), embedding.getValue(1, 0), this.size * (scale as number), this.color)
        }
    }

    transform(t: Matrix) {
        const embedding = t.multiply(this)
        return new Point(embedding.getValue(0, 0), embedding.getValue(1, 0), embedding.getValue(2, 0))
    }

    clone() {
        return new Point(this.getValue(0), this.getValue(1), this.getValue(2))
    }

    squeeze(): number[] {
        const A = [this.getValue(0), this.getValue(1), this.getValue(2)]
        return A
    }
}

export default Point