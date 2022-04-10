import Canvas from "../Canvas/Canvas"

class Input {

    LEFT=false
    RIGHT = false
    FORWARD=false
    BACKWARD = false
    UP=false
    DOWN=false

    A_UP=false
    A_DOWN = false
    A_LEFT=false
    A_RIGHT = false

    MOUSE_X_FRAME = 0
    MOUSE_Y_FRAME = 0

    canvas: HTMLCanvasElement

    constructor(canvas: Canvas) {
        this.canvas = canvas.canvas

        this.canvas.addEventListener('click', () => this.lockPointer())

        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e), false)

        this.canvas.addEventListener('keydown', e => this.handleKeyDown(e), false);
        this.canvas.addEventListener('keyup', e => this.handleKeyUp(e), false);
    }

    lockPointer() {
        this.canvas.requestPointerLock()
    }

    handleMouseMove(e: MouseEvent) {
        if (this.canvas === document.pointerLockElement) {
            this.MOUSE_X_FRAME += e.movementX
            this.MOUSE_Y_FRAME += e.movementY
        }
    }

    update() {
        this.MOUSE_X_FRAME = 0
        this.MOUSE_Y_FRAME = 0
    }

    handleKeyDown(e: KeyboardEvent) {
        switch(e.code) {
            case "KeyW":
                this.FORWARD = true
                break
            case "KeyA":
                this.LEFT = true
                break
            case "KeyS":
                this.BACKWARD = true
                break
            case "KeyD":
                this.RIGHT = true
                break
            case "Space":
                this.UP = true
                break
            case "ShiftLeft":
                this.DOWN = true
                break
            case "ArrowUp":
                this.A_UP = true
                break
            case "ArrowDown":
                this.A_DOWN = true
                break
            case "ArrowLeft":
                this.A_LEFT = true
                break
            case "ArrowRight":
                this.A_RIGHT = true
                break
        }
    } 

    handleKeyUp(e: KeyboardEvent) {
        switch (e.code) {
            case "KeyW":
                this.FORWARD = false
                break
            case "KeyA":
                this.LEFT = false
                break
            case "KeyS":
                this.BACKWARD = false
                break
            case "KeyD":
                this.RIGHT = false
                break
            case "Space":
                this.UP = false
                break
            case "ShiftLeft":
                this.DOWN = false
                break
            case "ArrowUp":
                this.A_UP = false
                break
            case "ArrowDown":
                this.A_DOWN = false
                break
            case "ArrowLeft":
                this.A_LEFT = false
                break
            case "ArrowRight":
                this.A_RIGHT = false
                break
        }
    }

}

export default Input