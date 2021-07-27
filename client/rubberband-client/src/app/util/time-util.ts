export class TimeUtil {
    static beatsToMilliseconds(beats:number, bpm:number){
        var bpms = bpm * (1/60000);
        var output = beats / (bpms);
        return output;
    }

    static beatsToTime(beats:number, bpm:number){
        var duration= this.beatsToMilliseconds(beats,bpm);
        var output = this.millisecondsToTime(duration);
        return output;
    }

    static millisecondsToTime(millisconds:number){
        var zzz = Math.floor(millisconds % 1000);
        var ss = Math.floor((millisconds/1000)%60);
        var mm = Math.floor((millisconds/1000)/60);
        var hh = Math.floor(((millisconds/1000)/60)/60);
        var output = 
            ((hh<10)?"0"+hh:hh) +":"
            + ((mm<10)?"0"+mm:mm) +":" 
            + ((ss<10)?"0"+ss:ss) +":"
            + ((zzz<100)?"00"+zzz:(zzz<10)? "0"+zzz:zzz);
        return output;
    }
}
