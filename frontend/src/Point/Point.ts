import Camera from "../Camera/Camera";
import Matrix from "../Matrix/Matrix";
import TransformMatrix from "../Matrix/TransformMatrix";
import ColumnVector from "../Vector/ColumnVector";

class Point extends ColumnVector {
    constructor(x: number, y: number, z: number, norm=1) {
        super([x, y, z, norm])
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
        const embedding = camera.mapPoint(this)
        if (embedding) {
            camera.canvas.point(embedding.getValue(0, 0), embedding.getValue(1, 0))
        }
    }

    transform(t: Matrix) {
        const embedding = t.multiply(this)
        return new Point(embedding.getValue(0, 0), embedding.getValue(1, 0), embedding.getValue(2, 0))
    }

    clone() {
        return new Point(this.getValue(0), this.getValue(1), this.getValue(2))
    }
}

export default Point