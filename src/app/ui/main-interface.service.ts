import { EventEmitter, Injectable } from '@angular/core'

@Injectable()
export class MainInterfaceService {

    public interfaceUpdated: EventEmitter<any> = new EventEmitter()

    private state: Object = {
        info: {},
        climate: {}
    }

    constructor() { }

    setState(state) {
        this.state = state
        this.interfaceUpdated.emit(this.state)
    }

    getState() {
        return this.state
    }
}
