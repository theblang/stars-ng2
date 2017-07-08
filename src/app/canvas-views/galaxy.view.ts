import { Galaxy } from '../models/galaxy.model'
import {ExtendedMesh} from '../models/extended-mesh.model'
import {Interactive} from './interactive'
import { Renderable } from './renderable'

declare const THREE: any

export class GalaxyView {

    private interactive: Interactive
    private renderable: Renderable

    constructor(private scene: THREE.Scene,
                private camera: THREE.Camera,
                private galaxy: Galaxy) {
        this.interactive = new Interactive(this.scene, this.camera)
        this.renderable = new Renderable(this.scene)
        this.draw()
    }

    public onClick(event: MouseEvent): ExtendedMesh {
        return this.interactive.shootRay(event.clientX, event.clientY)
    }

    public onDblClick(event: MouseEvent): ExtendedMesh {
        return this.interactive.shootRay(event.clientX, event.clientY)
    }

    public clear() {
        this.renderable.clear()
    }

    private draw() {
        let geometry
        let material
        let mesh

        // Clear the previous scene
        this.clear()

        // Position the camera
        this.camera.position.set(0, 1000, 2000)

        // Add lighting
        const pointLight = new THREE.PointLight(0xFFFFFF)
        pointLight.position.set(0, 0, 0)
        this.scene.add(new THREE.PointLight(0xFFFFFF))

        // Draw the systems
        for (const system of this.galaxy.systems) {
            geometry = new THREE.TetrahedronGeometry(40, 0);
            material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
            mesh = new ExtendedMesh(geometry, material, system)
            mesh.position.set(system.coords.x, system.coords.y, system.coords.z);
            this.scene.add(mesh)
        }
    }
}
