import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TimeUtil } from '../../util/time-util';

@Injectable({
  providedIn: 'root'
})
export class PlayerStateService {
  public onSetCurrentTime = new Subject();
  private currentTime:number;
  private duration:number;

  constructor() { 
    this.setCurrentTime(0);
    this.duration=0;
  }

  public setCurrentTime(currentTime:number){
    this.currentTime=currentTime;
    this.onSetCurrentTime.next(this.getCurrentTime());
  }

  public setDuration(duration:number){
    this.duration=duration;
  }

  public getDuration(){
    return this.duration;
  }

  public getDurationAsTime(){
    return TimeUtil.millisecondsToTime(this.duration);
  }

  public getCurrentTimeInMilliseconds(){
    return this.currentTime;
  }

  public getCurrentTime(){
    return TimeUtil.millisecondsToTime(this.currentTime);
  }

  public getOnSetCurrentTime(){
    return this.onSetCurrentTime.asObservable();
  }
}
