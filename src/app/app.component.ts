import {Component, HostListener} from '@angular/core'
import {GameStateService} from './game-state.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private gameStateService: GameStateService) {}

    @HostListener('document:keyup', ['$event'])
    onKeyup(event) {

        // See http://stackoverflow.com/a/2511474/1747491 and http://stackoverflow.com/a/35527852/1747491
        // Alt + Q
        if (event.altKey && event.keyCode === 81) {
            this.gameStateService.resetGameState()
        }
    }
}
