import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { WorkspaceComponent } from './editor/workspace/workspace.component';
import { TimelineComponent } from './editor/workspace/timeline/timeline.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent, EditorComponent, WorkspaceComponent, TimelineComponent],
  exports: [
    HomeComponent,
    EditorComponent
  ]
})
export class PagesModule { }
