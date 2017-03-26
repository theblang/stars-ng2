import { Coords } from './coords.model'
import { Focusable } from './focusable.interface'

export class Moon {

    constructor(public name: string,
                public coords: Coords,
                public radius: number,
                public distanceFromPlanet: number) {}

}
