import { Vector2 } from "./vector2";

export class DrawUtil {
    private context: CanvasRenderingContext2D;

    constructor(context :CanvasRenderingContext2D) {
        this.context = context;
    }

    line({start= new Vector2(0,0),end= new Vector2(0,0),color='black',lineWidth=1}:{start?:Vector2,end?:Vector2,color?:string, lineWidth?:number}){
        this.context.beginPath();
        this.context.moveTo(start.x,start.y);
        this.context.lineTo(end.x,end.y);
        this.context.strokeStyle=color;
        this.context.lineWidth=lineWidth;
        this.context.stroke();
    }
    
    text({text,position=new Vector2(0,0),font='12px verdana',color='black'}:{text:string,position:Vector2,font?:string,color?:string}){
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.fillText(text, position.x, position.y);
    }

    highlight({start = new Vector2(0,0),end = new Vector2(0,0), color='#232355'} : {start : Vector2, end : Vector2, color?:string}){
        this.context.beginPath();
        this.context.moveTo(start.x,start.y);
        this.context.lineTo(start.x,end.y);
        this.context.lineTo(end.x,end.y);
        this.context.lineTo(end.x,start.y);
        this.context.fillStyle=color;
        this.context.fill();
    }


    waveform({audio:string, position = new Vector2(0,0), size = new Vector2(0,0),color='#232355'} : {audio:string, position : Vector2, size : Vector2, color?:string}){
        this.context.fillStyle=color;
        this.context.rect(position.x,position.y,size.x, size.y);
        /*fill(bgcolor);
        rect(x, y, waveWidth, waveHeight);
        fill(color);
        beginShape();
        vertex(x,y+(waveHeight/2));
        for(var i=0;i<this.peaks.length;i++){
            vertex(x+(i/this.peaks.length*waveWidth), y+(waveHeight/2+this.peaks[i]*(waveHeight/2)));
            vertex(x+(i/this.peaks.length*waveWidth), y+(waveHeight/2-this.peaks[i]*(waveHeight/2)));
        }
        vertex(x+waveWidth,y+(waveHeight/2));
        endShape();*/
    }
}
