import {Coords} from "./coords.model";
import {Moon} from "./moon.model";

export class Planet {

    constructor(public name: string,
                public coords: Coords,
                public radius: number,
                public distanceFromSun: number,
                public moons: Moon[]) {}
}
