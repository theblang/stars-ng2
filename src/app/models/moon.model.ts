import {Coords} from "./coords.model";

export class Moon {

    constructor(public name: string,
                public coords: Coords,
                public radius: number,
                public distanceFromPlanet: number) {}
}
