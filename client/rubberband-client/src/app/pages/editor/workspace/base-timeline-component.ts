import { Component, ViewChild, AfterViewInit, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';
import { DrawUtil } from 'app/util/draw-util';
import { CoordinateUtil } from '../../../util/coordinate-util';
import { DragTrackerService } from './drag-tracker.service';
import { WorkspaceStateService } from './workspace-state.service';
import { Vector2 } from 'app/util/vector2';

@Component({
    template: ''
})
export abstract class BaseTimelineComponent implements AfterViewInit {
    @Output() protected onEmitSyncRedraw = new EventEmitter(); 
    @ViewChild('timelineCanvas', {static: false}) protected canvas: ElementRef;
    @ViewChild('timelineDiv', {static: false}) protected canvasDiv: ElementRef;
    
    protected context: CanvasRenderingContext2D;
    protected draw: DrawUtil;

    protected zoom : number;
    protected zoomFactor : number;

    protected highlightColor : string;  // TODO: Move these to a properties service 
    protected cursorColor : string; // TODO: Move these to a properties service 
    protected cursorWidth;  // TODO: Move these to a properties service 

    constructor(
        protected workspace:WorkspaceStateService,
        protected dragTracker:DragTrackerService
    ){
        this.zoom = this.workspace.getZoom();
        this.highlightColor = 'rgba(50,43,128,0.3)';
        this.cursorColor = 'red';
        this.cursorWidth = 1;
        this.zoomFactor=this.workspace.getZoomFactor();
    }

    ngAfterViewInit () {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.draw = new DrawUtil(this.context);
    
        this.updateSize();
        this.redraw();
    }


    public redraw(){
        const width = this.canvas.nativeElement.width;
        const height = this.canvas.nativeElement.height;
        const selection = this.workspace.getSelection();
        const cursorLoc = this.workspace.getCursorLoc();

        this.context.clearRect(0, 0, width, height);
        this.drawComponent(height);
    
        if (selection != null)
          this.draw.highlight({start: new Vector2(selection.startX,0), end: new Vector2(selection.endX,height),color:this.highlightColor});
    
        this.draw.line({start: new Vector2(cursorLoc,0),end: new Vector2(cursorLoc,height),color:this.cursorColor,lineWidth:this.cursorWidth});
    }

    protected abstract drawComponent(height:number);

    protected abstract updateSize();

    @HostListener('click', ['$event']) 
    onClick(event:MouseEvent) {
        
    }


    @HostListener('mousedown', ['$event']) 
    onMouseDown(event:MouseEvent){
        var mouseLoc = CoordinateUtil.relativeMouseCoordinates(event,this.canvas);
        const drag = this.dragTracker.getDragTracker();

        this.workspace.deselect();
        drag.start(event,this.canvas);

        // draw cursor
        this.workspace.setCursorLoc(mouseLoc.x);
        this.fireonEmitRedraw(event);
        this.redraw();
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event:MouseEvent){
        const drag = this.dragTracker.getDragTracker();
        if (!drag.isDragging()) return;
        
        const mouseLoc = CoordinateUtil.relativeMouseCoordinates(event,this.canvas);

        this.workspace.select({startX:drag.getMouseDownLoc().x,endX: mouseLoc.x});
        this.fireonEmitRedraw(event);
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event:MouseEvent){
        const drag = this.dragTracker.getDragTracker();
        drag.end(event, this.canvas);

        if (drag.getMouseUpLoc().x < drag.getMouseDownLoc().x){
        // draw cursor
        this.workspace.setCursorLoc(drag.getMouseUpLoc().x);
        this.fireonEmitRedraw(event);
        }

    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event:MouseEvent){
        const mouseLoc = CoordinateUtil.relativeMouseCoordinates(event,this.canvas);
        const drag = this.dragTracker.getDragTracker();

        if (drag.isDragging()){
        if(mouseLoc.x > drag.getMouseDownLoc().x){
            console.log("Scroll right");
        }
            
        else if(mouseLoc.x < drag.getMouseDownLoc().x)
            console.log("Scroll left");
        
        }
        else 
        drag.end(event, this.canvas);


    }

    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event:MouseEvent){
        const mouseLoc = CoordinateUtil.relativeMouseCoordinates(event,this.canvas);
        const drag = this.dragTracker.getDragTracker();

        if (drag.isDragging()){
        this.workspace.select({startX:drag.getMouseDownLoc().x,endX: mouseLoc.x});
        this.fireonEmitRedraw(event);
        }
    }
    
    fireonEmitRedraw(event:Event){
        this.onEmitSyncRedraw.emit(event);
    }


    /*
  @HostListener('window:resize')
  onResize() {
    this.updateSize();
    this.redraw();
  }
*/
}