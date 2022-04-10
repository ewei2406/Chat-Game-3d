import Edge from "../Edge/Edge"
import Point from "../Point/Point"

const MakeFlower = (x: number, y: number, z: number, color: string) => {
    const objs = []
    const bud = new Point(x, y + 2, z, 1, color, 1)
    objs.push(new Edge(bud, new Point(x, y, z, 1),'green'))
    objs.push(bud)
    return objs
}

export default MakeFlower