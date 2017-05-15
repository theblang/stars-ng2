import {EventEmitter, Injectable} from '@angular/core'
import {AngularFireDatabase} from 'angularfire2/database'
import {GameState} from './models/game-state'
import {GeneratorService} from './generator.service'

@Injectable()
export class GameStateService {
    public gameStateUpdated: EventEmitter<any> = new EventEmitter()
    public gameState: any // FIXME: Define a game state model.

    constructor(private db: AngularFireDatabase, private generatorService: GeneratorService) {
        this.gameState = {} // FIXME: Can't we set default above in the declaration?

        const gameStateObservable = db.object('/game-state')
        gameStateObservable.subscribe((gameStateJson) => {
            if (!gameStateJson) {
                console.error('Game state is missing or corrupt')
                return
            }

            this.gameState = new GameState(gameStateJson)
            this.gameStateUpdated.emit(this.gameState)
        })
    }

    // FIXME: Lock this function down to admins
    public resetGameState() {
        const gameStateObservable = this.db.object('/game-state')
        gameStateObservable.set({galaxy: this.generatorService.generateGalaxy()})
            .then(() => {
                console.log('Game state reset')
            })
    }
}
