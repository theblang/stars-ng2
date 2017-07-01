import { Component, OnInit } from '@angular/core'
import { MainInterfaceService } from './main-interface.service'
import { GameStateService } from '../state/game-state.service'
import { PlayerStateService } from '../state/player-state.service'
import { PlayerState } from '../models/player-state'

@Component({
    selector: 'app-interface',
    templateUrl: './main-interface.component.html',
    styleUrls: ['./main-interface.component.css']
})
export class MainInterfaceComponent implements OnInit {

    private mainInterfaceState = {}
    private playerState: PlayerState

    constructor(private mainInterfaceService: MainInterfaceService,
                private gameStateService: GameStateService,
                private playerStateService: PlayerStateService) {
    }

    ngOnInit() {
        this.mainInterfaceService.mainInterfaceUpdated.subscribe(
            (state: Object) => {
                this.mainInterfaceState = state
            }
        )

        this.playerState = this.playerStateService.getState()
        this.playerStateService.playerStateUpdated.subscribe(
            (state: Object) => {
                this.playerState = new PlayerState(state)
            }
        )
    }

    getActiveViewName(): string {
        return this.playerState.activeViewName
    }

    setActiveViewName(activeViewName: string) {
        const newPlayerState = this.playerStateService.getState()
        newPlayerState.activeViewName = activeViewName
        this.playerStateService.playerStateUpdated.emit(newPlayerState)

        this.mainInterfaceService.mainInterfaceUpdated.emit({})
    }
}
