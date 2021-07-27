import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavpanelComponent } from './navpanel/navpanel.component';
import { HeaderComponent } from './header/header.component';
import { PlayerComponent } from './player/player.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavpanelComponent, HeaderComponent, PlayerComponent],
  exports: [
    NavpanelComponent, 
    HeaderComponent,
    PlayerComponent
  ],
  providers: []
})
export class SharedModule { }
