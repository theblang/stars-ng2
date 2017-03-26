import { EventEmitter, Injectable } from '@angular/core'

@Injectable()
export class InterfaceService {
    public interfaceUpdated: EventEmitter<any> = new EventEmitter()
    private state = {
        info: {}
    }

    constructor() { }

    setInfo(info) {
        this.state.info = info
        this.interfaceUpdated.emit(this.state)
    }

    getInfo() {
        return this.state.info
    }
}
