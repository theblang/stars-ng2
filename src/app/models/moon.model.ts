import {Coords} from './coords.model'

export class Moon {

    public name: string
    public coords: Coords
    public radius: number
    public distanceFromPlanet: number

    constructor(moonJson: Object) {
        this.name = moonJson['name']
        this.coords = moonJson['coords']
        this.radius = moonJson['radius']
        this.distanceFromPlanet = moonJson['distanceFromPlanet']
    }

}
