import {Coords} from './coords.model'
import {Planet} from './planet.model'

export class System {

    public name: string
    public coords: Coords
    public planets: Planet[]

    constructor(systemJson: Object) {
        this.name = systemJson['name']
        this.coords = systemJson['coords']

        this.planets = []
        systemJson['planets'].forEach((planetJson) => {
            this.planets.push(new Planet(planetJson))
        })
    }
}
