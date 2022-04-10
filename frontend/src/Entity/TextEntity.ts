import Camera from "../Camera/Camera";
import Entity from "./Entity";

class TextEntity extends Entity {

    message: string
    lifespan: number

    constructor(x: number, y: number, z: number, message: string, lifespan=500) {
        super(x, y + 4, z, 0, 0, 0, "-1")
        this.message = "(" + message + ")"
        this.lifespan = lifespan
    }

    update(): boolean {
        this.lifespan--
        return this.lifespan > 0
    }

    draw(camera: Camera) {
        const [embedding, scale] = camera.mapPoint(this.position)
        if (embedding) {
            camera.canvas.text(
                embedding.getValue(0, 0), 
                embedding.getValue(1, 0), 
                this.message, 2 * (scale as number), 
                `rgba(0, 0, 0, ${1 - (Math.max(0, (100 - this.lifespan)/100))})`
                )
        }
    }
}

export default TextEntity