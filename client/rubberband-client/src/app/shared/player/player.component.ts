import { Component, OnInit } from '@angular/core';
import { PlayerStateService } from './player-state.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: []
})
export class PlayerComponent implements OnInit {
  duration:string;
  currentTime:string;

  constructor(private player: PlayerStateService) { }

  ngOnInit() {
    this.duration=this.player.getDurationAsTime();
    this.currentTime=this.player.getCurrentTime();
    this.player.onSetCurrentTime.subscribe((currentTime:string) => this.currentTime=currentTime);
  }

}
