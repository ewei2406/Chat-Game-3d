import Camera from "../Camera/Camera";
import Edge from "../Edge/Edge";
import Point from "../Point/Point";
import PositionPoint from "../Point/PositionPoint";
import WorldObject from "./WorldObject";

class Cube implements WorldObject {

    position: PositionPoint;
    verticies: PositionPoint[] = []
    edges: Edge[] = []

    constructor(x: number, y: number, z: number, dx=10, dy=10, dz=10, color="black", thickness=0.2) {
        this.position = new PositionPoint(x, y, z)

        for(let p_x = x; p_x <= x + dx; p_x += dx) {
            for (let p_y = y; p_y <= y + dy; p_y += dy) {
                for (let p_z = z; p_z <= z + dz; p_z += dz) {
                    this.verticies.push(new PositionPoint(p_x, p_y, p_z))
                }
            }
        }

        this.edges.push(new Edge(new Point(x, y, z), new Point(x + dx, y, z), color, thickness))
        this.edges.push(new Edge(new Point(x, y, z), new Point(x, y, z + dz), color, thickness))
        this.edges.push(new Edge(new Point(x, y, z), new Point(x, y + dy, z), color, thickness))

        this.edges.push(new Edge(new Point(x + dx, y + dy, z), new Point(x, y + dy, z), color, thickness))
        this.edges.push(new Edge(new Point(x + dx, y + dy, z), new Point(x + dx, y + dy, z + dz), color, thickness))
        this.edges.push(new Edge(new Point(x + dx, y + dy, z), new Point(x + dx, y, z), color, thickness))

        this.edges.push(new Edge(new Point(x + dx, y, z + dz), new Point(x + dx, y, z), color, thickness))
        this.edges.push(new Edge(new Point(x + dx, y, z + dz), new Point(x, y, z + dz), color, thickness))
        this.edges.push(new Edge(new Point(x + dx, y, z + dz), new Point(x + dx, y + dy, z + dz), color, thickness))

        this.edges.push(new Edge(new Point(x, y + dy, z + dz), new Point(x, y + dy, z), color, thickness))
        this.edges.push(new Edge(new Point(x, y + dy, z + dz), new Point(x, y, z + dz), color, thickness))
        this.edges.push(new Edge(new Point(x, y + dy, z + dz), new Point(x + dx, y + dy, z + dz), color, thickness))

    }

    draw(camera: Camera) {
        this.edges.forEach(edge => edge.draw(camera))
        // this.verticies.forEach(vertex => vertex.draw(camera))
    }
}

export default Cube