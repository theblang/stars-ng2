import {System} from "../../models/system.model"
import * as THREE from "three"

export class SystemView {
    constructor(private scene: THREE.Scene,
                private camera: THREE.Camera,
                private system: System) {
    }

    private clear() {
        for (let child of this.scene.children) {
            this.scene.remove(child)
        }
    }

    setup() {
        let geometry = null
        let material = null
        let mesh = null

        // Clear the previous scene
        this.clear()

        // Position the camera
        this.camera.position.set(0, 0, 2000)

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

        // Draw the planets
        console.log(this.system.planets)
        for (let planet of this.system.planets) {

            // Planet
            geometry = new THREE.SphereGeometry(planet.radius, 10, 10)
            material = new THREE.MeshBasicMaterial({color: 0x66FF00, wireframe: true})
            mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(planet.coords.x, planet.coords.y, planet.coords.z)
            this.scene.add(mesh)

            // Planet's orbit
            geometry = new THREE.Geometry()
            material = new THREE.LineBasicMaterial({color: 0xFFFFFF, opacity: 0.8})
            let resolution = 100
            let size = 360 / resolution
            let segment = null
            for (let i = 0; i <= resolution; i++) {
                segment = (i * size) * Math.PI / 180
                geometry.vertices.push(new THREE.Vector3(Math.cos(segment) * planet.distanceFromSun, 0, Math.sin(segment) * planet.distanceFromSun))
            }
            let line = new THREE.Line(geometry, material)
            this.scene.add(line)
        }
    }
}
