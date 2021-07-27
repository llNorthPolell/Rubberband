import { Component, AfterViewInit , ViewChild, ElementRef, HostListener, Output, EventEmitter, Inject} from '@angular/core';
import { BaseTimelineComponent } from '../base-timeline-component';
import { DragTrackerService } from '../drag-tracker.service';
import { Vector2 } from 'app/util/vector2';
import { WorkspaceStateService } from '../workspace-state.service';

@Component({
  selector: 'app-ruler',
  templateUrl: './ruler.component.html',
  styleUrls: []
})
export class RulerComponent extends BaseTimelineComponent implements AfterViewInit {
  constructor(
    @Inject(WorkspaceStateService) workspace:WorkspaceStateService, 
    @Inject(DragTrackerService) dragTracker:DragTrackerService) 
  {
    super(workspace,dragTracker);
  }

  drawComponent(height:number){
    // draw beat lines
    const color = 'white';
    const beatLineWidth = 1;
    const font = '10px Verdana';
    var start = new Vector2 (0,0);
    var end = new Vector2 (start.x, height);

    const maxBeat = this.workspace.getMaxBeat();
    const beatsPerBar = this.workspace.getBeatsPerBar();

    var i: number;
    
    for (i = 0; i < maxBeat; i ++){
      start.x = (i * this.zoom * this.zoomFactor);
      end.x = start.x;

      if (i % beatsPerBar == 0){
        start.y = height*0.5;
        this.draw.text({text:(i / beatsPerBar).toString(),position: start, font:font, color:color});
      } else {
        start.y = height*0.7;
      }

      this.draw.line({start,end,color:color,lineWidth:beatLineWidth});
    }

  }

  updateSize(){
    this.canvas.nativeElement.width = this.workspace.getMaxBeat() * (this.zoom * this.zoomFactor);
    this.canvas.nativeElement.height = this.canvasDiv.nativeElement.clientHeight * 0.25;
  }

}
