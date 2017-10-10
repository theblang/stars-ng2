import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/primeng'

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

    private items: MenuItem[]

    constructor() {
    }

    ngOnInit() {
        this.items = [{
            label: 'foo'
        }, {
            label: 'bar'
        }]
    }

}
