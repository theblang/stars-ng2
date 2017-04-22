import { EventEmitter, Injectable } from '@angular/core'

@Injectable()
export class InterfaceService {
    public interfaceUpdated: EventEmitter<any> = new EventEmitter()
    private state = {
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
