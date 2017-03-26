import { Coords } from './coords.model'
import { Moon } from './moon.model'
import { Focusable } from './focusable.interface'

export class Planet implements Focusable {

    constructor(public name: string,
                public coords: Coords,
                public radius: number,
                public distanceFromSun: number,
                public moons: Moon[]) {}

    public getInterfaceInfo() {
        return {
            name: this.name,
            description: `This is planet ${this.name}. It is ${this.radius * 2} big and ${this.distanceFromSun} distance from the sun`
        }
    }
}
