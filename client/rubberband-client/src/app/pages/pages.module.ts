import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';


import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { WorkspaceComponent } from './editor/workspace/workspace.component';
import { TrackTimelineComponent } from './editor/workspace/track-timeline/track-timeline.component';
import { RulerComponent } from './editor/workspace/ruler/ruler.component';

import { WorkspaceStateService } from './editor/workspace/workspace-state.service';
import { DragTrackerService } from './editor/workspace/drag-tracker.service';
import { WaveformComponent } from './editor/workspace/track-timeline/waveform/waveform.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  declarations: [HomeComponent, EditorComponent, WorkspaceComponent, TrackTimelineComponent, RulerComponent, WaveformComponent],
  exports: [
    HomeComponent,
    EditorComponent
  ],
  providers: [WorkspaceStateService, DragTrackerService]
})
export class PagesModule { }
