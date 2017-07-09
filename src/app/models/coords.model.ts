export class Coords {

    constructor(public x: number,
                public y: number,
                public z: number) {
    }

    toJSON() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
}
