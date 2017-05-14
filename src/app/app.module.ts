import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component'
import { GeneratorService } from './generator.service'
import { MainCanvasComponent } from './main-canvas/main-canvas.component'
import { InterfaceComponent } from './interfaces/interface.component'
import { InterfaceService } from './interfaces/interface.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdGridListModule, MdSliderModule } from '@angular/material'
import 'hammerjs'
import { BrowserModule } from '@angular/platform-browser'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../environments/environment'
import { GameStateService } from './game-state.service'

@NgModule({
    declarations: [
        AppComponent,
        MainCanvasComponent,
        InterfaceComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MdSliderModule,
        MdGridListModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    providers: [GeneratorService, InterfaceService, GameStateService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
