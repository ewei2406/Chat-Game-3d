class Matrix {

    private contents: Array<number[]>
    protected num_rows: number
    protected num_cols: number

    constructor(contents: Array<number[]>) {
        this.num_rows = contents.length
        this.num_cols = contents[0].length

        for (let r = 0; r < contents.length; r++) {
            if (contents[r].length != this.num_cols) throw new Error('non-rectangular matrix creation error')
        }

        this.contents = contents
    }

    toString() {
        let res = `(${this.num_rows}x${this.num_cols} Matrix)\n`
        this.contents.forEach(row => {
            res += "[" + row.map(i => i.toString().padStart(3, " ").slice(0, 5)).join(",") + "]\n"
        })
        return res
    }

    getValue(r: number, c: number) {
        return this.contents[r][c]
    }

    setValue(r: number, c: number, value: number) {
        this.contents[r][c] = value
        return this
    }

    addValue(r: number, c: number, value: number) {
        this.contents[r][c] += value
        return this
    }

    multiplyRow(r: number, factor: number) {
        this.contents[r] = this.contents[r].map(i => i * factor)
    }

    multiplyCol(c: number, factor: number) {
        for (let r = 0; r < this.num_rows; r++) {
            this.contents[r][c] *= factor
        }
    }

    addCol(values: number[]) {
        if (values.length != this.num_rows) throw new Error('Adding new column of wrong size error')
        for (let r = 0; r < this.num_rows; r++) {
            this.contents[r].push(values[r])
        }
        this.num_cols++
    }

    transpose() {
        const acc = []
        for (let c = 0; c < this.num_cols; c++) {
            const newRow = []
            for (let r = 0; r < this.num_rows; r++) {
                newRow.push(this.contents[r][c])
            }
            acc.push(newRow)
        }
        return new Matrix(acc)
    }

    getRow(r: number): number[] {
        return this.contents[r]
    }

    getCol(c: number): number[] {
        return this.contents.map(r => r[c])
    }

    dotProduct(other: Matrix): number {
        if (this.num_cols != other.num_cols || this.num_rows != other.num_rows) throw new Error('incompatible matrix size dot product error')
        let sum = 0;
        for (let r = 0; r < this.num_rows; r++) {
            for (let c = 0; c < this.num_cols; c++) {
                sum += this.getValue(r, c) * other.getValue(r, c)
            }
        }
        return sum
    }

    multiply(other: Matrix) {
        if (this.num_cols != other.num_rows) throw new Error('incompatible matrix size multiplication error')

        const acc = []
        for (let acc_r = 0; acc_r < this.num_rows; acc_r++) {
            const newRow = []
            for (let acc_c = 0; acc_c < other.num_cols; acc_c++) {
                const thisRow = this.getRow(acc_r)
                const otherCol = other.getCol(acc_c)
                const sum = thisRow.map((item, idx) => item * otherCol[idx]).reduce((p, a) => p + a, 0)
                newRow.push(sum)
            }
            acc.push(newRow)
        }

        return new Matrix(acc)
    }

    add(other: Matrix) {
        for (let r = 0; r < Math.min(this.num_rows, other.num_rows); r++) {
            for (let c = 0; c < Math.min(this.num_cols, other.num_cols); c++) {
                this.contents[r][c] += other.contents[r][c]
            }
        }
        return this
    }

    zero() {
        for (let r = 0; r < this.num_rows; r++) {
            for (let c = 0; c < this.num_cols; c++) {
                this.contents[r][c] = 0
            }
        }
        return this
    }

    isZero() {
        for (let r = 0; r < this.num_rows; r++) {
            for (let c = 0; c < this.num_cols; c++) {
                if (this.contents[r][c] != 0) return false
            }
        }
        return true
    }

    clone() {
        const newContents = Array(this.num_rows).fill(0).map(() => Array<number>(this.num_cols).fill(0))
        for (let r = 0; r < this.num_rows; r++) {
            for (let c = 0; c < this.num_cols; c++) {
                newContents[r][c] = this.contents[r][c]
            }
        }
        return new Matrix(newContents)
    }
}

export default Matrix