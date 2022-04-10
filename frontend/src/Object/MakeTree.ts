import Cube from "./Cube"

const MakeTree = (x: number, y: number, z: number, size=10, height=5, topSize=5): Cube[] => {
    const cubes: Cube[] = []

    cubes.push(new Cube(x, y, z, size, size * height, size, 'brown'))

    y += height * (size)
    x += size / 2
    z += size / 2
    for (let h = topSize; h > 0; h--) {
        cubes.push(new Cube(x - (size * h / 2), y, z - (size * h / 2), size * h, size / 2, size * h, 'green'))
        y += size / 2
    }

    return cubes
}

export default MakeTree