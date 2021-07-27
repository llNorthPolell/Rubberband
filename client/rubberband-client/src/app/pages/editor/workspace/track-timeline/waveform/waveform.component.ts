import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Wavesurfer from 'wavesurfer.js/dist/wavesurfer.js';

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: []
})
export class WaveformComponent implements AfterViewInit {
  @ViewChild('waveform', {static: false}) waveform:ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    var wavesurfer = Wavesurfer.create({
      container:this.waveform.nativeElement,
      backgroundColor: 'rgba(3,169,244, 0.25)',
      height:75,
      waveColor: '#959595',
      progressColor:'#959595',
      cursorWidth:0,
      fillParent: false,
      minPxPerSec:41,
      backend: 'MediaElementWebAudio',
    });
    
    wavesurfer.load('/assets/audio/Guitar.mp3');
  }

}
