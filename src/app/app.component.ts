import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core'
import {GeneratorService} from "./generator.service";

declare const THREE

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('rendererContainer') rendererContainer: ElementRef

    renderer = new THREE.WebGLRenderer()
    scene = null
    camera = null
    galaxy = null
    ship = null

    constructor(private generatorService: GeneratorService) {
        // Create galaxy
        this.galaxy = generatorService.generateGalaxy()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1e10)
        this.camera.position.z = 1000
        this.camera.position.y = 2

        this.scene.add(this.camera)

        // Add light
        const dirLight = new THREE.DirectionalLight(0xffffff)
        dirLight.position.set(200, 200, 1000).normalize()
        this.camera.add(dirLight)
        this.camera.add(dirLight.target)

        // Load ship
        const loader = new THREE.VRMLLoader() // FIXME: Need VRMLLoader in type definition
        loader.load( 'assets/models/Blang.wrl', (object) => {
            this.ship = object
            this.scene.add(object)
        })
    }

    ngAfterViewInit() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement)
        this.animate()
    }

    animate() {
        window.requestAnimationFrame(() => this.animate())

        if(this.ship) {
            this.ship.rotation.x += 0.01
            this.ship.rotation.y += 0.02
        }

        this.renderer.render(this.scene, this.camera)
    }
}
