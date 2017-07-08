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
    private playerState: PlayerState = new PlayerState()

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

        this.playerStateService.state.subscribe(
            (state: PlayerState) => {
                this.playerState = state
            }
        )
    }

    getActiveViewName(): string {
        return this.playerState.activeViewName
    }

    setActiveViewName(activeViewName: string) {
        const newPlayerState = this.playerStateService.state.getValue()
        newPlayerState.activeViewName = activeViewName
        this.playerStateService.setState(newPlayerState)
        this.mainInterfaceService.mainInterfaceUpdated.emit({})
    }
}
