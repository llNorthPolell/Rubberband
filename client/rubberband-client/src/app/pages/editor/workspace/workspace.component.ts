import { Component, OnInit, ViewChild, ViewChildren, QueryList  } from '@angular/core';
import { WorkspaceStateService } from './workspace-state.service'
import { AudioTrack } from '../../../core/models/audio-track';
import { TrackTimelineComponent } from './track-timeline/track-timeline.component';
import { RulerComponent } from './ruler/ruler.component';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: [],
  providers: [WorkspaceStateService]
})
export class WorkspaceComponent implements OnInit {
  @ViewChildren(TrackTimelineComponent) timelines:QueryList<TrackTimelineComponent>;
  @ViewChild(RulerComponent, {static: false}) ruler:RulerComponent;

  tracklist : Map<string,AudioTrack>;
  
  index:number;

  constructor(private workspace: WorkspaceStateService) { 
    this.index = (this.tracklist==null)? 0: this.tracklist.keys.length+1;
    
  }

  ngOnInit() {
    this.tracklist=this.workspace.getTracklist();
  }


  addNewTrack(){
    this.workspace.addTrack("Track" + this.index);
    this.index++;
  }

  
  removeTrack(id:string){
    this.workspace.removeTrack(id);
  }

  redraw(){
    this.ruler.redraw();
    this.timelines.forEach((timeline)=>{timeline.redraw();}); 
  }
}
