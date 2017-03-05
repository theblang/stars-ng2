import {Coords} from "./coords.model";
import {Planet} from "./planet.model";

export class System {

    constructor(public name: string,
                public coords: Coords,
                public planets: Planet[]) {}
}
