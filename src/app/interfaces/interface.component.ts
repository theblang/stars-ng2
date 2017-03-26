import { Component, OnInit } from '@angular/core'
import { InterfaceService } from './interface.service'

@Component({
    selector: 'app-interface',
    templateUrl: './interface.component.html',
    styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

    interfaceState = {}
    showExit = false

    constructor(private interfaceService: InterfaceService) { }

    ngOnInit() {
        this.interfaceService.interfaceUpdated.subscribe(
            (state) => {
                this.interfaceState = state
            }
        )
    }

}
