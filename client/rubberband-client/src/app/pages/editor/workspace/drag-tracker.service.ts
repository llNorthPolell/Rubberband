import { Injectable } from '@angular/core';
import { DragTracker } from 'app/util/drag-tracker';

@Injectable({
  providedIn: 'root'
})
export class DragTrackerService {
  private drag: DragTracker;

  constructor() { 
    this.drag = new DragTracker();
  }

  public getDragTracker(){
    return this.drag;
  }
}
