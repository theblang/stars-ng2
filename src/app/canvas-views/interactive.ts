import {ExtendedMesh} from '../models/extended-mesh.model'

declare const THREE: any

export class Interactive {
    private raycaster = new THREE.Raycaster()

    constructor(private scene: THREE.Scene,
                private camera: THREE.Camera) {
    }

    public shootRay(x, y): ExtendedMesh {
        const vector = new THREE.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.5)
        this.raycaster.setFromCamera(vector, this.camera) // http://stackoverflow.com/a/29373404/1747491

        const intersects = this.raycaster.intersectObjects(this.scene.children)

        if (intersects.length > 0) {
            const intersectedMesh: ExtendedMesh = intersects[0].object

            // compute the position of the new camera location
            const A = new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z)
            const B = new THREE.Vector3(intersectedMesh.position.x, intersectedMesh.position.y, intersectedMesh.position.z)
            const AB = new THREE.Vector3((B.x - A.x), (B.y - A.y), (B.z - A.z))
            AB.normalize()

            return intersectedMesh
        } else {
            return null
        }
    }
}
