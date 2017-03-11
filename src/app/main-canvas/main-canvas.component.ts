import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core'
import {GeneratorService} from "../generator.service"
import {Galaxy} from "../models/galaxy.model"
import {SystemView} from "./views/system.view"
import * as THREE from 'three'

@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.css']
})
export class MainCanvasComponent implements OnInit, AfterViewInit {
    @ViewChild('rendererContainer') rendererContainer: ElementRef

    scene: THREE.Scene = null
    renderer: THREE.Renderer = new THREE.WebGLRenderer({antialias: true})
    camera: THREE.Camera = null
    galaxy: Galaxy = null
    systemView: SystemView = null
    ship = null

    constructor(private generatorService: GeneratorService) {
    }

    ngOnInit() {
        // Create galaxy
        this.galaxy = this.generatorService.generateGalaxy()

        // Create scene
        this.scene = new THREE.Scene()

        // Create camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000)
        this.scene.add(this.camera)

        // // Load ship
        // const loader = new THREE.VRMLLoader() // FIXME: Need VRMLLoader in type definition
        // loader.load( 'assets/models/Blang.wrl', (object) => {
        //     this.ship = object
        //     this.scene.add(object)
        // })

        // Initialize the game view to the first system for now
        this.systemView = new SystemView(this.scene, this.camera, this.galaxy.systems[0])
        this.systemView.setup()
    }

    ngAfterViewInit() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement)

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
    }
}
