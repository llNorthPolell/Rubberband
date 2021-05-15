import {ElementRef} from '@angular/core';
import {Vector2} from './vector2';

export class CoordinateUtil {
    static relativeMouseCoordinates(event:MouseEvent,element:ElementRef){
        const rect = element.nativeElement.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        //return {mouseX:mouseX, mouseY:mouseY};
        return new Vector2(mouseX, mouseY);
    }


}
