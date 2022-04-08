import Matrix from "../Matrix/Matrix";

class RowVector extends Matrix {
    constructor(contents: number[]) {
        super([contents])
    }
}

export default RowVector