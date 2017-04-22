import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core'
import { GeneratorService } from '../generator.service'
import { Galaxy } from '../models/galaxy.model'
import { SystemView } from './system.view'
import { InterfaceService } from '../interfaces/interface.service'
import { Focusable } from '../models/focusable.interface'

declare const THREE: any
declare const Stats: any
declare const TWEEN: any

@Component({
    selector: 'app-main-canvas',
    templateUrl: './main-canvas.component.html',
    styleUrls: ['./main-canvas.component.css']
})
export class MainCanvasComponent implements OnInit, AfterViewInit {
    @ViewChild('rendererContainer') rendererContainer: ElementRef

    private scene: THREE.Scene
    private renderer: THREE.Renderer
    private camera: THREE.Camera
    private controls: THREE.OrbitControls
    private galaxy: Galaxy
    private stats
    private activeView

    constructor(private generatorService: GeneratorService,
                private interfaceService: InterfaceService) { }

    ngOnInit() {
        this.stats = new Stats()
        this.renderer = new THREE.WebGLRenderer({antialias: true})

        // Create galaxy
        this.galaxy = this.generatorService.generateGalaxy()

        // Create scene
        this.scene = new THREE.Scene()

        // Create camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000)
        this.scene.add(this.camera)

        // Load ship
        const loader = new THREE.VRMLLoader()
        loader.load( 'assets/models/Blang.wrl', (scene: THREE.Scene) => {
            if(!scene.children || scene.children.length <= 0) {
                throw 'Could not load VRML model';
            }

            // Get the ship object from the parsed scene
            const ship: THREE.Object3D = scene.children[0];

            // Turn the ship into a non-shaded mesh
            const shipMesh: THREE.Mesh = <THREE.Mesh> ship.children[0]
            shipMesh.material = new THREE.MeshBasicMaterial({
                color: 0xEBEBEB,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            })

            // Add a wireframe
            const wireframeGeometry = new THREE.EdgesGeometry(shipMesh.geometry)
            const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x5A5A5A, linewidth: 2 })
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial)
            shipMesh.add(wireframe)

            ship.position.set(0, 500, 0)
            this.scene.add(ship)
        })
    }

    ngAfterViewInit() {
        const containerElem = this.rendererContainer.nativeElement

        // Setup Stats widget
        this.stats.domElement.cssText = 'position:fixed;cursor:pointer;opacity:0.9;z-index:10000'
        this.stats.domElement.style.top = null
        this.stats.domElement.style.left = null
        this.stats.domElement.style.right = 0
        this.stats.domElement.style.bottom = 0
        containerElem.appendChild(this.stats.domElement)

        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        const canvasElem = containerElem.appendChild(this.renderer.domElement)

        // Create controls
        this.controls = new (<any>window).THREE.OrbitControls(this.camera, canvasElem)

        // Initialize the game view to the first system for now
        const systemView = new SystemView(this.scene, this.camera, this.controls, this.galaxy.systems[0])
        this.activeView = systemView

        // Begin animation loop
        this.animate()
    }

    animate() {
        window.requestAnimationFrame(() => this.animate())

        // if(this.ship) {
        //     this.ship.rotation.x += 0.01
        //     this.ship.rotation.y += 0.02
        // }

        this.renderer.render(this.scene, this.camera)
        this.controls.update()
        this.stats.update()
        TWEEN.update()
    }

    // See http://stackoverflow.com/a/20434960/1747491 and http://stackoverflow.com/a/35527852/1747491
    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
        this.renderer.setSize(event.target.innerWidth, event.target.innerHeight)
    }

    onDblClick(event) {
        const focusedObject: Focusable = this.activeView.onDblClick(event)
        if(focusedObject) {
            this.interfaceService.setState(focusedObject.getInterfaceState())
        }
        else {
            this.interfaceService.setState({})
        }
    }
}
