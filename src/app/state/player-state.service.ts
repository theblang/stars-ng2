import { EventEmitter, Injectable } from '@angular/core'
import { PlayerState } from '../models/player-state'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class PlayerStateService {
    public state: BehaviorSubject<PlayerState>

    constructor() {
        const playerStateJson = window.localStorage.getItem('/player-state')
        this.state = new BehaviorSubject<PlayerState>(PlayerState.fromJson(playerStateJson || {}))
    }

    setState(playerState: PlayerState) {
        this.state.next(playerState)

        // FIXME: Using localStorage for now until we decide on backend persistence model
        window.localStorage.setItem('/player-state', JSON.stringify(playerState))
    }
}
