import { AudioLoop } from "./audio-loop";

export class AudioTrack {
    public id:string;
    public content:AudioLoop[];

    public constructor(id:string){
        this.id=id;
    }
}
