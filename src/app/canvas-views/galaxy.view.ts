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
        // this.scene.add(new THREE.AmbientLight(0x555555))

        // Draw the sun
        geometry = new THREE.SphereGeometry(100, 10, 10)
        material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true})
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        this.scene.add(mesh)

        // Draw the systems
        for (const system of this.galaxy.systems) {
        }
    }
}
