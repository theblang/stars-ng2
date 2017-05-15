import {Galaxy} from './galaxy.model'

export class GameState {
    galaxy: Galaxy

    constructor(gameStateJson: Object) {
        this.galaxy = new Galaxy(gameStateJson['galaxy'])
    }
}
