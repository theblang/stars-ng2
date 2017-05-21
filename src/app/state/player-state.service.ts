import {EventEmitter, Injectable} from '@angular/core'
import { PlayerState } from '../models/player-state'

@Injectable()
export class PlayerStateService {
    public playerStateUpdated: EventEmitter<any> = new EventEmitter()
    private state: Object

    constructor() {
    }

    setState(state: PlayerState) {
        this.state = state
        window.localStorage.setItem('/player-state', JSON.stringify(this.state))
        this.playerStateUpdated.emit(this.state)
    }

    getState(): PlayerState {
        // FIXME: Using localStorage for now until we decide on backend persistence model
        const playerStateJson = window.localStorage.getItem('/player-state') || {
                activeViewName: 'system',
                activeSystemIndex: 0
            }
        return new PlayerState(playerStateJson)
    }
}
