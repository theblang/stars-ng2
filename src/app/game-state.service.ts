import { EventEmitter, Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'

@Injectable()
export class GameStateService {
    public gameStateUpdated: EventEmitter<any> = new EventEmitter()
    public gameState: any // FIXME: Define a game state model.

    constructor(db: AngularFireDatabase) {
        this.gameState = {} // FIXME: Can't we set default above in the declaration?

        const gameStateObservable = db.object('/game-state')
        gameStateObservable.subscribe((gameState) => {
            this.gameState = gameState
            this.gameStateUpdated.emit(this.gameState)

            // FIXME: Just temporary. Move this galaxy generation somewhere else.
            // FIXME: Uncommenting this causes the browser to freeze. Only need once to seed, but figure out why.
            // if (!this.gameState || !this.gameState.galaxy) {
            //     gameStateObservable.set({galaxy: generatorService.generateGalaxy()})
            // }
        })
    }

}
