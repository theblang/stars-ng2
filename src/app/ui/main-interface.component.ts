import { Component, OnInit } from '@angular/core'
import { MainInterfaceService } from './main-interface.service'

@Component({
    selector: 'app-interface',
    templateUrl: './main-interface.component.html',
    styleUrls: ['./main-interface.component.css']
})
export class MainInterfaceComponent implements OnInit {

    interfaceState = {}

    constructor(private mainInterfaceService: MainInterfaceService) { }

    ngOnInit() {
        this.mainInterfaceService.interfaceUpdated.subscribe(
            (state) => {
                this.interfaceState = state
            }
        )
    }

}
