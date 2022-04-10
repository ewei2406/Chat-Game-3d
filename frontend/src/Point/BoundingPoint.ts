import Matrix from "../Matrix/Matrix";
import Point from "./Point";

class BoundingPoint extends Point {

    constructor(width: number, height: number, depth: number, norm = 1) {
        super(width, height, depth, norm)
    }

    getWidth() {
        return this.getValue(0)
    }

    getHeight() {
        return this.getValue(1)
    }

    getDepth() {
        return this.getValue(2)
    }

    setWidth(x: number) {
        this.setValue(0, x)
    }

    setHeight(y: number) {
        this.setValue(1, y)
    }

    setDepth(z: number) {
        this.setValue(2, z)
    }

    getTranslateMatrix(factor = -1) {
        return new Matrix([
            [1, 0, 0, factor * this.getWidth()],
            [0, 1, 0, factor * this.getHeight()],
            [0, 0, 1, factor * this.getDepth()],
        ])
    }

    clone() {
        return new BoundingPoint(this.getWidth(), this.getHeight(), this.getDepth())
    }
}

export default BoundingPoint