import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'

import {AppComponent} from './app.component'
import {GeneratorService} from "./generator.service";
import { MainCanvasComponent } from './main-canvas/main-canvas.component';

@NgModule({
    declarations: [
        AppComponent,
        MainCanvasComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [GeneratorService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
