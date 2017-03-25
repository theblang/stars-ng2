import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core'
import {GeneratorService} from "../generator.service"
import {Galaxy} from "../models/galaxy.model"
import {SystemView} from "./views/system.view"

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

    stats = null
    scene = null
    renderer = null
    camera = null
    controls = null
    galaxy: Galaxy = null
    activeView = null
    ship = null

    constructor(private generatorService: GeneratorService) {
        this.renderer = new THREE.WebGLRenderer({antialias: true})
    }

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
        // (<any>window).THREE lets us make use of the extensions added to window
        // See http://stackoverflow.com/a/30740935/1747491
        // const loader = new (<any>window).THREE.VRMLLoader()
        // loader.load( 'assets/models/Blang.wrl', (object) => {
        //     this.ship = object
        //     this.scene.add(object)
        // })
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

    onDblClick(event) {
        this.activeView.handleDblClick(event)
    }
}
