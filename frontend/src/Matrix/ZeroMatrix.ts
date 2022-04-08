import Matrix from "./Matrix";

class ZeroMatrix extends Matrix {
    constructor(rows: number, cols: number) {
        super(Array(rows).fill(0).map(() => Array<number>(cols).fill(0)))
    }
}

export default ZeroMatrix