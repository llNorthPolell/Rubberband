import { Injectable, Inject } from '@angular/core';
import { CoordinateUtil } from 'app/util/coordinate-util';
import { AudioTrack } from '../../../core/models/audio-track';
import { PlayerStateService } from '../../../shared/player/player-state.service';
import { TimeUtil } from '../../../util/time-util';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceStateService {
  private tracklist : Map<string,AudioTrack>;
  private selection : {startX, endX};
  
  private beatsPerBar : number;
  private maxBeat : number;

  private bpm:number;

  private cursorLoc:number;
  private zoom:number;
  private zoomFactor:number;

  constructor(@Inject(PlayerStateService)private player:PlayerStateService) { 
    this.tracklist=new Map<string,AudioTrack>();
 
    this.beatsPerBar = 4;
    this.maxBeat = 100 * this.beatsPerBar;
    this.bpm=100;

    this.zoom = 100;
    this.zoomFactor = 0.25;

    this.cursorLoc=0;

    this.player.setDuration(TimeUtil.beatsToMilliseconds(this.maxBeat,this.bpm));
  }

  public addTrack(id:string){
    this.tracklist.set(id,new AudioTrack(id));
  }

  public removeTrack(id:string){
    this.tracklist.delete(id);
  }

  public select(selection:{startX, endX}){
    this.selection=selection;
  }

  public deselect(){
    this.selection=null;
  }

  public setCursorLoc(cursorLoc:number){
    this.cursorLoc = cursorLoc;

    var currentBeat = CoordinateUtil.mouseCoordinateToExactBeat(cursorLoc, this.zoom, this.zoomFactor);
    this.player.setCurrentTime(TimeUtil.beatsToMilliseconds(currentBeat,this.bpm));
  }

  public setBPM(bpm:number){
    this.bpm=bpm;
    this.player.setDuration(TimeUtil.beatsToMilliseconds(this.maxBeat,this.bpm));
  }

  public setZoom(zoom:number){
    this.zoom=zoom;
  }
  
  public getTracklist(){
    return this.tracklist;
  }

  public getNumberOfTracks(){
    return this.tracklist.keys.length;
  }

  public getSelection(){
    return this.selection;
  }

  public getBeatsPerBar(){
    return this.beatsPerBar;
  }

  public getMaxBeat(){
    return this.maxBeat;
  }

  public getBPM(){
    return this.bpm;
  }

  public getCursorLoc(){
    return this.cursorLoc;
  }

  public getZoom(){
    return this.zoom;
  }

  public getZoomFactor(){
    return this.zoomFactor;
  }
}
