import Matrix from "../Matrix/Matrix";

class ColumnVector extends Matrix {
    constructor(contents: number[]) {
        super(contents.map(i => [i]))
    }
}

export default ColumnVector