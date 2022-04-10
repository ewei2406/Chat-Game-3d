import Camera from "../Camera/Camera"
import BoundingPoint from "../Point/BoundingPoint"
import PositionPoint from "../Point/PositionPoint"

interface WorldObject {
    position: PositionPoint
    // hitbox: BoundingPoint
    draw: (camera: Camera) => void
}

export default WorldObject