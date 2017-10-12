import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { GameState } from '../models/game-state'
import { GeneratorService } from '../misc/generator.service'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class GameStateService {
    public state: BehaviorSubject<GameState>

    constructor(private db: AngularFireDatabase, private generatorService: GeneratorService) {
        db.object('/game-state').valueChanges().subscribe((gameStateJson) => {
            if (!gameStateJson) {
                console.error('Game state is missing or corrupt')
                return
            }

            this.setState(new GameState(gameStateJson))
        })

        this.state = new BehaviorSubject(null)
    }

    setState(state: GameState) {
        this.state.next(state)
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
