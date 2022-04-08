import Matrix from "../Matrix/Matrix";
import Point from "./Point";

class PositionPoint extends Point {

    constructor(x: number, y: number, z: number, norm=1) {
        super(x, y, z, norm)
    }

    getX() {
        return this.getValue(0)
    }

    getY() {
        return this.getValue(1)
    }

    getZ() {
        return this.getValue(2)
    }

    setX(x: number) {
        this.setValue(0, x)
    }

    setY(y: number) {
        this.setValue(1, y)
    }

    setZ(z: number) {
        this.setValue(2, z)
    }

    getTranslateMatrix(factor=-1) {
        return new Matrix([
            [1, 0, 0, factor * this.getX()],
            [0, 1, 0, factor * this.getY()],
            [0, 0, 1, factor * this.getZ()],
        ])
    }

    clone() {
        return new PositionPoint(this.getX(), this.getY(), this.getZ())
    }
}

export default PositionPoint