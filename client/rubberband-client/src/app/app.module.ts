import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerStateService } from './shared/player/player-state.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
//    HttpModule,
    PagesModule,
    SharedModule,
    NoopAnimationsModule
  ],
  providers: [PlayerStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
