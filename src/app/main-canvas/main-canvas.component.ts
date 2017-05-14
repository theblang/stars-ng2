import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { GeneratorService } from '../generator.service'
import { Galaxy } from '../models/galaxy.model'
import { SystemView } from './system.view'
import { InterfaceService } from '../interfaces/interface.service'
import { ExtendedMesh } from '../models/extended-mesh.model'
import { GameStateService } from '../game-state.service'

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
    private ship: THREE.Object3D
    private stats
    private activeView

    constructor(private interfaceService: InterfaceService,
                private gameStateService: GameStateService) { }

    ngOnInit() {
        this.stats = new Stats()
        this.renderer = new THREE.WebGLRenderer({antialias: true})

        // Create galaxy
        this.galaxy = this.gameStateService.gameState.galaxy

        // Create scene
        this.scene = new THREE.Scene()

        // Create camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000)
        this.scene.add(this.camera)

        // Load ship
        const loader = new THREE.VRMLLoader()
        loader.load('assets/models/Blang.wrl', (scene: THREE.Scene) => {
            if (!scene.children || scene.children.length <= 0) {
                throw 'Could not load VRML model'
            }

            // Get the ship object from the parsed scene
            this.ship = THREE.Object3D = scene.children[0]

            // Turn the ship into a non-shaded mesh
            const shipMesh: THREE.Mesh = <THREE.Mesh> this.ship.children[0]
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

            this.ship.position.set(0, 500, 0)
            this.scene.add(this.ship)
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
        this.controls = new THREE.OrbitControls(this.camera, canvasElem)

        // Begin animation loop
        this.animate()

        // Set up game state listener
        this.gameStateService.gameStateUpdated.subscribe(
            (gameState) => {
                if (!gameState || !gameState.galaxy) {
                    return
                }

                // Initialize the game view to the first system for now
                this.activeView = new SystemView(this.scene, this.camera, this.controls, gameState.galaxy.systems[0])
            }
        )
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
        const focusedMesh: ExtendedMesh = this.activeView.onDblClick(event)
        if (focusedMesh) {

            // Point the camera towards the focused object
            const pointTween = new TWEEN.Tween(this.controls.target).to({
                x: focusedMesh.position.x,
                y: focusedMesh.position.y,
                z: focusedMesh.position.z
            }, 750).onComplete(() => {
                // Zoom the camera towards the object. Note that we are not using chain because we need to know the
                // position of the camera after the first move.
                const directionVector = this.camera.getWorldDirection()
                const newPosition = directionVector.multiplyScalar(this.camera.position.distanceTo(focusedMesh.position) - 2000)

                new TWEEN.Tween(this.camera.position).to({
                    x: this.camera.position.x + newPosition.x,
                    y: this.camera.position.y,
                    z: this.camera.position.z + newPosition.z
                }, 750).start()
            })

            pointTween.start()

            if (this.ship) {
                // Rotate ship towards and move to focused object
                // See http://stackoverflow.com/a/25278875/1747491
                // FIXME: Improve the rotation so that it doesn't have the silly "whipping" effect

                // backup original rotation
                const startRotation = new THREE.Euler().copy(this.ship.rotation)

                // temporarily lookAt
                this.ship.lookAt(focusedMesh.position)
                const endRotation = new THREE.Euler().copy(this.ship.rotation)

                // revert to original rotation
                this.ship.rotation.copy(startRotation)

                // Tween
                const rotateTween = new TWEEN.Tween(this.ship.rotation).to({
                    x: endRotation.x,
                    y: endRotation.y,
                    z: endRotation.z
                }, 750).start()
                const moveTween = new TWEEN.Tween(this.ship.position).to({
                    x: focusedMesh.position.x,
                    y: this.ship.position.y,
                    z: focusedMesh.position.z
                }, 750)

                rotateTween.chain(moveTween)
                rotateTween.start()
            }

            if (focusedMesh.object) {
                this.interfaceService.setState(focusedMesh.object.getInterfaceState())
            }
        }
        else {
            this.interfaceService.setState({})
        }
    }
}
