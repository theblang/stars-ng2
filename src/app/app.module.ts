import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component'
import { GeneratorService } from './generator.service'
import { MainCanvasComponent } from './canvases/main-canvas.component'
import { MainInterfaceComponent } from './ui/main-interface.component'
import { MainInterfaceService } from './ui/main-interface.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdButtonModule, MdGridListModule, MdSliderModule } from '@angular/material'
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
        MainInterfaceComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MdSliderModule,
        MdGridListModule,
        MdButtonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    providers: [GeneratorService, MainInterfaceService, GameStateService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
