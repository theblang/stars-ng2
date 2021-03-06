import { System } from '../models/system.model'
import { ExtendedMesh } from '../models/extended-mesh.model'
import { Coords } from '../models/coords.model'
import { Interactive } from './interactive'
import { Renderable } from './renderable'

declare const THREE: any

export class SystemView {

    private interactive: Interactive
    private renderable: Renderable

    private static getOrbitLine(distanceFromCenter: number, centerPosition: Coords) {
        const geometry = new THREE.Geometry()
        const material = new THREE.LineBasicMaterial({color: 0xFFFFFF, opacity: 0.8})
        const resolution = 100
        const size = 360 / resolution
        let segment = null
        for (let i = 0; i <= resolution; i++) {
            segment = (i * size) * Math.PI / 180
            geometry.vertices.push(new THREE.Vector3(Math.cos(segment) * distanceFromCenter,
                0,
                Math.sin(segment) * distanceFromCenter))
        }

        const line = new THREE.Line(geometry, material)

        if (centerPosition) {
            line.translateX(centerPosition.x)
            line.translateY(centerPosition.y)
            line.translateZ(centerPosition.z)
        }

        return line
    }

    constructor(private scene: THREE.Scene,
                private camera: THREE.Camera,
                private system: System,
                private shipObject: THREE.Object3D) {
        this.interactive = new Interactive(this.scene, this.camera)
        this.renderable = new Renderable(this.scene)
        this.draw()
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

        // Draw the planets
        for (const planet of this.system.planets) {

            // Planet
            geometry = new THREE.SphereGeometry(planet.radius, 10, 10)
            material = new THREE.MeshBasicMaterial({color: 0x66FF00, wireframe: true})
            mesh = new ExtendedMesh(geometry, material, planet)
            mesh.position.set(planet.coords.x, planet.coords.y, planet.coords.z)
            this.scene.add(mesh)

            // Planet's orbit
            this.scene.add(SystemView.getOrbitLine(planet.distanceFromSun, null))

            for (const moon of planet.moons) {

                // Moon
                geometry = new THREE.SphereGeometry(moon.radius, 10, 10)
                material = new THREE.MeshBasicMaterial({color: 0xA9A9A9, wireframe: true})
                mesh = new ExtendedMesh(geometry, material, moon)
                mesh.position.set(moon.coords.x, moon.coords.y, moon.coords.z)
                this.scene.add(mesh)

                // Moon's orbit
                this.scene.add(SystemView.getOrbitLine(moon.distanceFromPlanet, planet.coords))
            }
        }

        // Draw the ship
        // Turn the ship into a non-shaded mesh
        const shipMesh: THREE.Mesh = <THREE.Mesh> this.shipObject.children[0]
        shipMesh.material = new THREE.MeshBasicMaterial({
            color: 0xEBEBEB,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        })

        // Add a wireframe
        const wireframeGeometry = new THREE.EdgesGeometry(shipMesh.geometry)
        const wireframeMaterial = new THREE.LineBasicMaterial({color: 0x5A5A5A, linewidth: 2})
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial)
        shipMesh.add(wireframe)

        // FIXME: Hack to fix shapeWright models. Figure out the right way to correct rotation.
        shipMesh.rotation.y = Math.PI / 2

        this.shipObject.position.set(0, 500, 0)
        this.scene.add(this.shipObject)
    }
}
