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

    public getInterfaceState() {
        return {
            info: {
                name: this.name,
                description: `This is system ${this.name}. It has ${this.planets.length} planets.`
            },
            system_stats: {
                num_planets: this.planets.length,
                num_moons: this.planets.reduce((sum, planet) => sum + planet.moons.length, 0)
            }
        }
    }
}
