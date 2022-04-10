import Cube from "./Cube";

const MakeHouse = (x: number, y: number, z: number, size: number, width: number, depth: number, height: number) => {
    const cubes: Cube[] = []

    // Frame
    cubes.push(new Cube(x, y, z, size * width, size * height, size * depth, 'black', size / 10))
    // cubes.push(new Cube(x + size, y, z + size, size * (width - 2), size * (height - 1), size * (width - 2)))

    // Door
    cubes.push(new Cube(x + size, y, z, size, size * 2, size * 0.1, 'brown', size / 15))
    cubes.push(new Cube(x + (size * 1.7), y + size, z - size * 0.1, size * 0.2, size * 0.2, size * 0.2, 'gold', size / 15))

    cubes.push(new Cube(x + size * (width - 2), y + size * height, z + size * (depth - 2), size, size * 2, size, 'grey', size / 10))

    return cubes
}

export default MakeHouse