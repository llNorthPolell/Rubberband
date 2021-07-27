import {ElementRef} from '@angular/core';
import {Vector2} from './vector2';

export class CoordinateUtil {
    static relativeMouseCoordinates(event:MouseEvent,element:ElementRef){
        const rect = element.nativeElement.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        return new Vector2(mouseX, mouseY);
    }

    static mouseCoordinateToExactBeat(x:number, zoom:number, zoomFactor:number){
        return x/(zoom*zoomFactor);
    }
}
