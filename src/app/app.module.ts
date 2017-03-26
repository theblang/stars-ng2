import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { GeneratorService } from './generator.service'
import { MainCanvasComponent } from './main-canvas/main-canvas.component'
import { InterfaceComponent } from './interfaces/interface.component'
import { InterfaceService } from './interfaces/interface.service'

@NgModule({
    declarations: [
        AppComponent,
        MainCanvasComponent,
        InterfaceComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [GeneratorService, InterfaceService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
