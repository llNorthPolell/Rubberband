import { Component, AfterViewInit , ViewChild, ElementRef, HostListener } from '@angular/core';
import { DrawUtil } from 'app/util/draw-util';
import { CoordinateUtil } from 'app/util/coordinate-util';
import { DragTracker } from 'app/util/drag-tracker';
import { Vector2 } from 'app/util/vector2';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements AfterViewInit  {
  @ViewChild('timelineCanvas', {static: false}) timelineCanvas: ElementRef;
  @ViewChild('timelineDiv', {static: false}) timelineDiv: ElementRef;

  private context: CanvasRenderingContext2D;
  private draw: DrawUtil;
  private drag: DragTracker;

  public minScopeTime : number;
  private scopeInterval : number;
  public zoom : number;
  public beatsPerBar : number; 

  private selection : {startX, endX}; // TODO: Move to a PlayerController so player can use this too, and convert coordinate units to beats
  private cursorLoc : number; // TODO: Move to a PlayerController so player can use this too, and and convert coordinate units to beats

  private highlightColor : string;  // TODO: Move these to a properties service 
  private cursorColor : string; // TODO: Move these to a properties service 
  private cursorWidth;  // TODO: Move these to a properties service 


  constructor() {
    this.minScopeTime = 0;
    this.scopeInterval = 60;
    this.zoom = 100;
    this.beatsPerBar = 4;
    this.highlightColor = 'rgba(50,43,128,0.3)';
    this.cursorColor = 'red';
    this.cursorWidth = 1;

    this.cursorLoc = 0;
    this.drag = new DragTracker();
  }

  ngAfterViewInit () {
    this.context = this.timelineCanvas.nativeElement.getContext('2d');
    this.draw = new DrawUtil(this.context);
    
    this.timelineCanvas.nativeElement.width = this.timelineDiv.nativeElement.clientWidth;
    this.timelineCanvas.nativeElement.height = this.timelineDiv.nativeElement.clientHeight;

    this.redraw();
  }

  public redraw(){
    const width = this.timelineCanvas.nativeElement.width;
    const height = this.timelineCanvas.nativeElement.height;
    this.context.clearRect(0, 0, width, height);
    this.drawTimeline(width, height);

    if (this.selection != null)
      this.draw.highlight({start: new Vector2(this.selection.startX,0), end: new Vector2(this.selection.endX,height),color:this.highlightColor});

    this.draw.line({start: new Vector2(this.cursorLoc,0),end: new Vector2(this.cursorLoc,height),color:this.cursorColor,lineWidth:this.cursorWidth});
  }

  private drawTimeline(width:number, height:number){
    // draw beat lines
    const color = 'white';
    const beatLineWidth = 1;
    const headerLineWidth = 3;
    const font = '16px Verdana';
    var start = new Vector2 (0,0);
    var end = new Vector2 (start.x, height);

    var i: number;

    for (i = this.minScopeTime; i < this.minScopeTime+this.scopeInterval; i ++){
      start.x = ((i - this.minScopeTime) * this.zoom);
      end.x = start.x;

      if (i % this.beatsPerBar == 0){
        start.y = height*0.015;
        this.draw.text({text:(i / this.beatsPerBar).toString(),position: start, font:font, color:color});
      } else {
        start.y = height*0.03;
      }

      this.draw.line({start,end,color:color,lineWidth:beatLineWidth});
    }
    
    // draw header line
    this.draw.line({start: new Vector2(0,height*(0.05)),end: new Vector2(width,height*(0.05)),color:color,lineWidth:headerLineWidth});
  }


  @HostListener('window:resize')
  onResize() {
    this.timelineCanvas.nativeElement.width = this.timelineDiv.nativeElement.clientWidth;
    this.timelineCanvas.nativeElement.height = this.timelineDiv.nativeElement.clientHeight;
    this.redraw();
  }


  @HostListener('click', ['$event']) 
  onClick(event:MouseEvent) {
    var mouseLoc = CoordinateUtil.relativeMouseCoordinates(event,this.timelineCanvas);
    const height = this.timelineDiv.nativeElement.clientHeight;
    //console.log('Coordinate:' + mouseLoc.toString());
    
    // draw cursor
    this.cursorLoc = mouseLoc.x;
    this.redraw();
  }


  @HostListener('mousedown', ['$event']) 
  onMouseDown(event:MouseEvent){
    const mouseLoc = CoordinateUtil.relativeMouseCoordinates(event,this.timelineCanvas);

    this.selection = null;
    this.drag.start(event,this.timelineCanvas);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event:MouseEvent){
    if (!this.drag.isDragging()) return;
    
    const height = this.timelineDiv.nativeElement.clientHeight;
    const mouseLoc = CoordinateUtil.relativeMouseCoordinates(event,this.timelineCanvas);

    this.selection = {startX:this.drag.getMouseDownLoc().x,endX: mouseLoc.x};
    this.redraw();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event:MouseEvent){
    this.drag.end(event, this.timelineCanvas);
  }

}
