Tone.Transport.bpm.value = 120;                                                         //song tempo 132
let instrumentTypes = ['triangle','sine','sawtooth'];

function playNote(instantiatedInstrument,noteValue,noteLength,noteTime){                    //instantiatedInstrument = createInstrument(cInstrument, cVolume)
    Tone.Transport.schedule(function (time) {instantiatedInstrument.triggerAttackRelease(noteValue, noteLength, time)}, noteTime);
}

function createInstrument(cInstrument, cVolume){
    const createdInstrument = new Tone.Synth();                                             //initializes instrument
    createdInstrument.oscillator.type = cInstrument;                                        //ex 'triangle','sine','sawtooth'
    const playGain = new Tone.Gain(cVolume);                                                //ex 0 < volume < 1
    playGain.toMaster();                                                                    //connects gain to audio
    createdInstrument.connect(playGain);
    return createdInstrument
}

function countMaxRepeats(array){
    let currentMax = 1,
        count;
    for(let i = 0 ; i < array.length ; ){
        count = 0;
        do {
            i++;
            count++;
        } while (array[i-1] === array[i]);
        if(count > currentMax){
            currentMax = count;
        }
    }
    return currentMax;
}

function playNotes(noteInstrument,noteVolume,noteValues,noteLengths,noteTimes){
    let instrumentInstances = [];
    for (let z = 0; z < countMaxRepeats(noteTimes); z++){
        instrumentInstances.push(createInstrument(noteInstrument, noteVolume))
    }
    for (let i = 0; i < noteValues.length; ) {
        let j = 0;
        do {
            playNote(instrumentInstances[j], noteValues[i], noteLengths[i], noteTimes[i]);
            i++;
            j++;
        } while (noteTimes[i-1] === noteTimes[i])
    }
}

// CONVERTS LOCAL TIME TO UPTICK TIMING (OPTIONAL TOOL)-----------------------------------------------------------------
function scheduleTiming(timingArray) {
    let outputArray = [1],                                                              //song at 120bpm starts at 2 = 1:0:0, otherwise first note is skipped
        currentTime = 1;                                                                //song at 120bpm starts at 2 = 1:0:0, otherwise first note is skipped
    for (let i = 0; i < timingArray.length; i++) {
        currentTime += Tone.Time(timingArray[i]).toSeconds();                           //converts the 8n/16n notation to seconds and adds it to the current time
        outputArray.push(currentTime)
    }
    return outputArray;
}

function scheduleTimingBars(timingArray) {
    let outputArray = [];
    for (let i = 0; i < timingArray.length; i++) {
        outputArray.push(Tone.Time(timingArray[i]).toBarsBeatsSixteenths())
    }
    return outputArray;
}

function msToBars(timingArray) {                                                        // convert an array of milliseconds into BarsBeatsSixteenths ('0:0:0')
    let outputArray = [];
    let adjustForZero;
    let barNotation;
    let roundedBarNotation;
    for (let i = 0; i < timingArray.length; i++) {
        adjustForZero = (timingArray[i])/1000;                                          //now can be used to covert
        barNotation = Tone.Time(adjustForZero).toBarsBeatsSixteenths();
        roundedBarNotation = barNotation.substring(0,barNotation.lastIndexOf(':')+4);
        outputArray.push(roundedBarNotation)
    }
    return outputArray;
}

// BASS INSTRUMENT------------------------------------------------------------------------------------------------------
let arrayNotes = ['B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2'];
noteLengths =["0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2"];
let barTiming = ["1:0:0","1:0:2","1:1:0","1:1:2","1:2:0","1:2:2","1:3:0","1:3:2","2:0:0","2:0:2","2:1:0","2:1:2","2:2:0","2:2:2","2:3:0","2:3:2","3:0:0","3:0:2","3:1:0","3:1:2","3:2:0","3:2:2","3:3:0","3:3:2","4:0:0","4:0:2","4:1:0","4:1:2","4:2:0","4:2:2","4:3:0","4:3:2"];

// MELODY INSTRUMENT----------------------------------------------------------------------------------------------------
let arrayNotes2 = ['B3','B4','B3','B4','B3','B4','D4','F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4'];
noteLengths2 = ["0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:1","0:0:3","0:0:2","0:1:0","0:0:2","0:0:2","0:0:2","0:0:1","0:0:3","0:0:2","0:1:0","0:0:2","0:0:2","0:0:2","0:0:1","0:0:3","0:0:2","0:1:0","0:0:2","0:0:2","0:0:2","0:0:1","0:0:3","0:0:2","0:1:0"];
let barTiming2 = ["1:0:0","1:0:0","1:0:2","1:0:2","1:1:0","1:1:0","1:1:2","1:1:3","1:2:2","1:3:0","2:0:0","2:0:2","2:1:0","2:1:2","2:1:3","2:2:2","2:3:0","3:0:0","3:0:2","3:1:0","3:1:2","3:1:3","3:2:2","3:3:0","4:0:0","4:0:2","4:1:0","4:1:2","4:1:3","4:2:2","4:3:0"];

Tone.Transport.start();                                                                     //starts the song
playNotes(instrumentTypes[0],.3,arrayNotes2,noteLengths2,barTiming2);
playNotes(instrumentTypes[0],.6,arrayNotes,noteLengths,barTiming);

// console.log(Tone.Time(.5).toNotation());                                                 //convert seconds into 2n,4n,or 8n (bpm defined on Tone)
// console.log(Tone.Time('2n').toSeconds());                                                //convert 2n,4n,or 8n into seconds
// console.log(Tone.Time(2.0).toBarsBeatsSixteenths());                                     //convert seconds into 0:0:0 (bars:Beats:sixteenths)
// console.log(Tone.Time('4n').toBarsBeatsSixteenths());                                    //convert 2n,4n,or 8n into 0:0:0 (bars:Beats:sixteenths)

// setTimeout(() => {
//     Tone.Transport.stop()
// }, 21000);

// msArray = [1500,2000,3456,4000];
// console.log(msToBars(msArray));
// console.log(3.648 % 0.5);