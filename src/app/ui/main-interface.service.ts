import { EventEmitter, Injectable } from '@angular/core'

@Injectable()
export class MainInterfaceService {

    public mainInterfaceUpdated: EventEmitter<any> = new EventEmitter()

    private state: Object = {
        info: {},
        climate: {}
    }

    constructor() { }

    setState(state) {
        this.state = state
        this.mainInterfaceUpdated.emit(this.state)
    }

    getState() {
        return this.state
    }
}
