import {EventEmitter, Injectable} from '@angular/core'
import {AngularFireDatabase} from 'angularfire2/database'
import {GameState} from '../models/game-state'
import {GeneratorService} from '../misc/generator.service'

@Injectable()
export class GameStateService {
    public gameStateUpdated: EventEmitter<any> = new EventEmitter()
    public state: GameState

    constructor(private db: AngularFireDatabase, private generatorService: GeneratorService) {
        const gameStateObservable = db.object('/game-state')
        gameStateObservable.subscribe((gameStateJson) => {
            if (!gameStateJson) {
                console.error('Game state is missing or corrupt')
                return
            }

            this.state = new GameState(gameStateJson)
            this.gameStateUpdated.emit(this.state)
        })
    }

    setState(state) {
        this.state = state
        this.gameStateUpdated.emit(this.state)
    }

    getState(): GameState {
        return this.state || new GameState({})
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
