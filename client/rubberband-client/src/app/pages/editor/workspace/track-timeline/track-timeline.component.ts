import { Component, AfterViewInit , ViewChild, ElementRef, HostListener, Output, EventEmitter, Inject } from '@angular/core';
import { BaseTimelineComponent } from '../base-timeline-component';
import { DragTrackerService } from '../drag-tracker.service';
import { Vector2 } from 'app/util/vector2';
import { WorkspaceStateService } from '../workspace-state.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './track-timeline.component.html',
  styleUrls: []
})
export class TrackTimelineComponent extends BaseTimelineComponent {
  constructor(
    @Inject(WorkspaceStateService)  workspace:WorkspaceStateService,
    @Inject(DragTrackerService)  dragTracker:DragTrackerService) 
  {
      super(workspace,dragTracker);
  }

  drawComponent(height:number){
    // draw beat lines
    const color = 'white';
    const beatLineWidth = 0.25;

    const maxBeat = this.workspace.getMaxBeat();

    var start = new Vector2 (0,0);
    var end = new Vector2 (start.x, height);

    var i: number;

    for (i = 0; i < maxBeat; i ++){
      start.x = (i * this.zoom * this.zoomFactor);
      end.x = start.x;

      this.draw.line({start,end,color:color,lineWidth:beatLineWidth});
    }
  }

  updateSize(){
    this.canvas.nativeElement.width = this.workspace.getMaxBeat() * this.zoom * this.zoomFactor;
    this.canvas.nativeElement.height = 75;
  }


}
