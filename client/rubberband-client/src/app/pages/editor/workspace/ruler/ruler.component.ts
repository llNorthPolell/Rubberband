import { Component, AfterViewInit , ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ruler',
  templateUrl: './ruler.component.html',
  styleUrls: ['./ruler.component.css']
})
export class RulerComponent implements AfterViewInit  {
 // @ViewChild('timelineCanvas', {static: false}) timelineCanvas: ElementRef;

  constructor() { }

  ngAfterViewInit () {
  }

  draw(){
    
  }
}
