import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  tracks : string[];

  constructor() { 
    this.tracks = [];
  }

  ngOnInit() {
  }


  addNewTrack(){
    this.tracks.push('Track '+this.tracks.length);
  }

  removeTrack(){
    this.tracks.pop();
  }
}
