class Canvas {

    id: string
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    constructor(id: string, w=600, h=400) {
        this.id = id
        this.canvas = document.getElementById(id) as HTMLCanvasElement
        this.canvas.width = w
        this.canvas.height = h
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    }

    fill(color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    point(x: number, y: number, size=2, color="black") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x - size/2, y - size/2, size, size)
    }

    line(x0: number, y0: number, x1: number, y1: number, color="green") {
        this.ctx.strokeStyle = color
        this.ctx.beginPath()
        this.ctx.moveTo(x0, y0)
        this.ctx.lineTo(x1, y1)
        this.ctx.stroke()
    }

    text(x0: number, y0: number, text: string, size=10, color="black") {
        this.ctx.fillStyle = color
        this.ctx.font = `${size}px Arial`
        const size_t = this.ctx.measureText(text)
        this.ctx.fillText(text, x0 - size_t.width / 2, y0)
    }
}

export default Canvas