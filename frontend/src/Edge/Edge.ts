import Camera from "../Camera/Camera";
import Matrix from "../Matrix/Matrix";
import TransformMatrix from "../Matrix/TransformMatrix";
import Point from "../Point/Point";

class Edge {
    start: Point
    stop: Point
    color: string
    thickness: number

    constructor(start: Point, stop: Point, color="black", thickness=0.2) {
        this.start = start
        this.stop = stop
        this.color = color
        this.thickness = thickness
    }

    draw(camera: Camera) {
        const [startEmbedding, startScale] = camera.mapPoint(this.start)
        const [stopEmbedding, stopScale] = camera.mapPoint(this.stop)

        const avgScale = Math.min((startScale as number), (stopScale as number))

        if (startEmbedding && stopEmbedding) {
            camera.canvas.line(
                startEmbedding.getValue(0, 0),
                startEmbedding.getValue(1, 0),
                stopEmbedding.getValue(0, 0),
                stopEmbedding.getValue(1, 0),
                this.color,
                this.thickness * (avgScale as number)
                )
        }
    }

    transform(t: Matrix) {
        return new Edge(this.start.transform(t), this.stop.transform(t), this.color)
    }
}

export default Edge