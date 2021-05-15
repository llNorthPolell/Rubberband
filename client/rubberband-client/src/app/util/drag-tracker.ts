import { ElementRef } from '@angular/core';
import { CoordinateUtil } from 'app/util/coordinate-util';
import { Vector2 } from 'app/util/vector2';

export class DragTracker {
    private mouseDownLoc: Vector2;
    private mouseUpLoc: Vector2;

    private dragActive : boolean;

    public constructor(){
        this.dragActive = false;
    }


    public getMouseDownLoc(){
        return this.mouseDownLoc;
    }

    public getMouseUpLoc(){
        return this.mouseUpLoc;
    }

    public isDragging(){
        return this.dragActive;
    }

    public start(event : MouseEvent, element : ElementRef){
        this.mouseDownLoc = CoordinateUtil.relativeMouseCoordinates(event,element);
        this.dragActive = true;
    }

    public end(event : MouseEvent, element : ElementRef){
        this.mouseUpLoc =  CoordinateUtil.relativeMouseCoordinates(event,element);
        this.dragActive = false;
    }

    public reset(){
        this.mouseDownLoc = null;
        this.mouseUpLoc = null;
        this.dragActive = false;
    }

}
