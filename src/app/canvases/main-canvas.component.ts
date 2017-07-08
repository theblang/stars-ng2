import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { SystemView } from '../canvas-views/system.view'
import { ExtendedMesh } from '../models/extended-mesh.model'
import { GameStateService } from '../state/game-state.service'
import { MainInterfaceService } from '../ui/main-interface.service'
import { PlayerStateService } from '../state/player-state.service'
import { GalaxyView } from '../canvas-views/galaxy.view'
import { PlayerState } from '../models/player-state'

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
    private shipObject: THREE.Object3D
    private stats
    private activeView
    private cachedPlayerState: PlayerState = new PlayerState({})

    constructor(private mainInterfaceService: MainInterfaceService,
                private gameStateService: GameStateService,
                private playerStateService: PlayerStateService) {
    }

    ngOnInit() {
        this.stats = new Stats()
        this.renderer = new THREE.WebGLRenderer({antialias: true})

        // Create scene
        this.scene = new THREE.Scene()

        // Create camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000)
        this.scene.add(this.camera)

        // Load ship
        const loader = new THREE.VRMLLoader()
        loader.load('assets/models/Blang.wrl', (shipScene: THREE.Scene) => {
            if (!shipScene.children || shipScene.children.length <= 0) {
                throw new Error('Could not load VRML model')
            }

            // Get the ship object from the parsed scene
            this.shipObject = shipScene.children[0]
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

                // If we have an active view then clear it
                if (this.activeView) {
                    this.activeView.clear()
                }

                // Initialize the game view to the first system for now
                // FIXME: Eventually we want to initialize where the player left off. Need to think about that.
                this.activeView = new SystemView(this.scene, this.camera, gameState.galaxy.systems[0], this.shipObject)
            }
        )

        // Set up player state listener
        this.playerStateService.playerStateUpdated.subscribe(
            (playerState: PlayerState) => {
                if (!playerState) {
                    return
                }

                if (this.cachedPlayerState.activeViewName !== playerState.activeViewName) {
                    this.activeView.clear()
                    this.controls.reset() // https://stackoverflow.com/a/29991405/1747491
                }

                if (playerState.activeViewName === 'system') {
                    const activeSystem = this.gameStateService.getState().galaxy.systems[playerState.activeSystemIndex]
                    this.activeView = new SystemView(this.scene, this.camera, activeSystem, this.shipObject)
                } else if (playerState.activeViewName === 'galaxy') {
                    this.activeView = new GalaxyView(this.scene, this.camera, this.gameStateService.getState().galaxy)
                }

                this.cachedPlayerState = playerState
            }
        )
    }

    // See http://stackoverflow.com/a/20434960/1747491 and http://stackoverflow.com/a/35527852/1747491
    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
        this.renderer.setSize(event.target.innerWidth, event.target.innerHeight)
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

    onDblClick(event) {
        const focusedMesh: ExtendedMesh = this.activeView.onDblClick(event)

        if (focusedMesh && this.activeView instanceof SystemView) {

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

            if (this.shipObject) {
                // Rotate ship towards and move to focused object
                // See http://stackoverflow.com/a/25278875/1747491
                // FIXME: Improve the rotation so that it doesn't have the silly "whipping" effect

                // backup original rotation
                const startRotation = new THREE.Euler().copy(this.shipObject.rotation)

                // temporarily lookAt
                this.shipObject.lookAt(focusedMesh.position)
                const endRotation = new THREE.Euler().copy(this.shipObject.rotation)

                // revert to original rotation
                this.shipObject.rotation.copy(startRotation)

                // Tween
                const rotateTween = new TWEEN.Tween(this.shipObject.rotation).to({
                    x: endRotation.x,
                    y: endRotation.y,
                    z: endRotation.z
                }, 750).start()
                const moveTween = new TWEEN.Tween(this.shipObject.position).to({
                    x: focusedMesh.position.x,
                    y: this.shipObject.position.y,
                    z: focusedMesh.position.z
                }, 750)

                rotateTween.chain(moveTween)
                rotateTween.start()
            }

            if (focusedMesh.object) {
                this.mainInterfaceService.setState(focusedMesh.object.getInterfaceState())
            }
        } else if (focusedMesh && this.activeView instanceof GalaxyView) {

            new TWEEN.Tween(this.controls.target).to({
                x: focusedMesh.position.x,
                y: focusedMesh.position.y,
                z: focusedMesh.position.z
            }, 750).start()

            if (focusedMesh.object) {
                this.mainInterfaceService.setState(focusedMesh.object.getInterfaceState())
            }
        } else {
            this.mainInterfaceService.setState({})
        }
    }
}
