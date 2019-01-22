Tone.Transport.bpm.value = 132;                                                         //song tempo 132
let instrumentTypes = ['triangle','sine','sawtooth'];

function playNote(noteInstrument,noteStepper,noteArray,noteLengthArray,time){           //time is built into js
    noteInstrument.triggerAttackRelease(noteArray[noteStepper], noteLengthArray[noteStepper], time);
    noteStepper++;
}

function playNotes(inInstrument,inNotes,inLengths,inTiming){
    for (let i = 0; i < inNotes.length; i++) {
        Tone.Transport.schedule(function (time) {
            playNote(inInstrument,i,inNotes,inLengths,time)
        }, inTiming[i]);
    }
}

function playInstrumentNote(pInstrument, pVolume, pNotes, pLengths, pTimes){                 //INSTRUMENT CAN PLAY ONE NOTE AT A TIME
    const playIn = new Tone.Synth();                                                    //initializes instrument
    playIn.oscillator.type = pInstrument;                                                //ex 'triangle','sine','sawtooth'
    const playGain = new Tone.Gain(pVolume);                                             //ex 0 < volume < 1
    playGain.toMaster();                                                                //connects gain to audio
    playIn.connect(playGain);                                                           //connects instrument and gain
    playNotes(playIn, pNotes, pLengths, pTimes);                                           //notes that the instrument plays
}

// function playInstrumentNotes(instrument, volume, notes, lengths, times) {            //INSTRUMENT CAN PLAY MULTIPLE NOTES AT A TIME
//
// }

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

// PAIRED INSTRUMENT----------------------------------------------------------------------------------------------------
// let pairNotes = ['B4', 'B4', 'B4', 'B4', 'B4', 'B4', 'B4'];
// let pairLengths = ['8n', '8n', '8n', '8n', '8n', '8n', '8n'];
// let pairTiming = ["1:0:0","1:0:2","1:1:0","1:1:2","1:1:3","1:2:2","1:3:0"];

// BASS INSTRUMENT------------------------------------------------------------------------------------------------------
let arrayNotes = ['B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2'];
let noteLengths = ['8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n'];
let localTiming = ['8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n'];
let timing = scheduleTiming(localTiming);
// let barTiming = scheduleTimingBars(timing);
// console.log(barTiming);
let barTiming = ["1:0:0","1:0:2","1:1:0","1:1:2","1:2:0","1:2:2","1:3:0","1:3:2","2:0:0","2:0:2","2:1:0","2:1:2","2:2:0","2:2:2","2:3:0","2:3:2","3:0:0","3:0:2","3:1:0","3:1:2","3:2:0","3:2:2","3:3:0","3:3:2","4:0:0","4:0:2","4:1:0","4:1:2","4:2:0","4:2:2","4:3:0","4:3:2","5:0:0"];

// MELODY INSTRUMENT----------------------------------------------------------------------------------------------------
let arrayNotes2 = ['B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4'];
let noteLengths2 = ['8n', '8n', '8n', '16n', '0:0:3', '8n', '4n', '8n', '8n', '8n', '16n', '0:0:3', '8n', '4n', '8n', '8n', '8n', '16n', '0:0:3', '8n', '4n', '8n', '8n', '8n', '16n', '0:0:3', '8n', '4n'];
let localTiming2 = ['8n', '8n', '8n', '16n', '0:0:3', '8n', '4n', '8n', '8n', '8n', '16n', '0:0:3', '8n', '4n', '8n', '8n', '8n', '16n', '0:0:3', '8n', '4n', '8n', '8n', '8n', '16n', '0:0:3', '8n', '4n'];
let timing2 = scheduleTiming(localTiming2);
// let barTiming2 = scheduleTimingBars(timing2);
// console.log(barTiming2);
let barTiming2 = ["1:0:0","1:0:2","1:1:0","1:1:2","1:1:3","1:2:2","1:3:0","2:0:0","2:0:2","2:1:0","2:1:2","2:1:3","2:2:2","2:3:0","3:0:0","3:0:2","3:1:0","3:1:2","3:1:3","3:2:2","3:3:0","4:0:0","4:0:2","4:1:0","4:1:2","4:1:3","4:2:2","4:3:0","5:0:0"];


Tone.Transport.start();                                                                     //starts the song
// playInstrumentNote(instrumentTypes[0],.5,arrayNotes2, noteLengths2, timing2);            //timing in seconds
// playInstrumentNote(instrumentTypes[0],.9,arrayNotes, noteLengths, timing);               //timing in seconds
playInstrumentNote(instrumentTypes[0],.3,arrayNotes2, noteLengths2, barTiming2);         //timing in bbs (bars:beats:sixteenths)
playInstrumentNote(instrumentTypes[0],.6,arrayNotes, noteLengths, barTiming);            //timing in bbs
// playInstrumentNote(instrumentTypes[0],.9,pairNotes, pairLengths, pairTiming);

// console.log(Tone.Time(.5).toNotation());                                                 //convert seconds into 2n,4n,or 8n (bpm defined on Tone)
// console.log(Tone.Time('2n').toSeconds());                                                //convert 2n,4n,or 8n into seconds
// console.log(Tone.Time(2.0).toBarsBeatsSixteenths());                                     //convert seconds into 0:0:0 (bars:Beats:sixteenths)
// console.log(Tone.Time('4n').toBarsBeatsSixteenths());                                    //convert 2n,4n,or 8n into 0:0:0 (bars:Beats:sixteenths)

// setTimeout(() => {
//     Tone.Transport.stop()
// }, 21000);