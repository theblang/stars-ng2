import {System} from "./system.model"

export class Galaxy {

    public name: string
    public systems: System[]

    constructor(galaxyJson: Object) {
        this.name = galaxyJson['name']

        this.systems = []
        galaxyJson['systems'].forEach((systemJson) => {
            this.systems.push(new System(systemJson))
        })
    }
}
