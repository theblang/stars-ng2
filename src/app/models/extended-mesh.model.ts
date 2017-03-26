import * as THREE from 'three'

export class ExtendedMesh extends THREE.Mesh {
    public object = null

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material, object) {
        super(geometry, material)
        this.object = object
    }
}
