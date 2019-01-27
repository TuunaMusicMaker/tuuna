Tone.Transport.bpm.value = 120;                                                         //song tempo 132
let instrumentTypes = ['triangle','sine','sawtooth'];


// // PLAYBACK FUNCTIONS---------------------------------------------------------------------------------------------------
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
    let instrumentInstances = [['0:0:0',createInstrument(noteInstrument, noteVolume)]];
    for (let i = 0; i < noteValues.length; i++) {
        let startTime = noteTimes[i];
        let finishTime = Tone.Time(Tone.Time(startTime).valueOf() + Tone.Time(noteLengths[i]).valueOf() - Tone.Time('0:0:0.1').valueOf()).toBarsBeatsSixteenths();
        for(let j = 0 ; j <= instrumentInstances.length ; j++){
            if(j === instrumentInstances.length){
                instrumentInstances.push([finishTime, createInstrument(noteInstrument, noteVolume)]);
                instrumentInstances[j][0] = finishTime;
                playNote(instrumentInstances[j][1], noteValues[i], noteLengths[i], noteTimes[i]);
                break;
            } else if (startTime > instrumentInstances[j][0]){
                instrumentInstances[j][0] = finishTime;
                playNote(instrumentInstances[j][1], noteValues[i], noteLengths[i], noteTimes[i]);
                break;
            }
        }
    }
}


// // PACKAGING FUNCTIONS---------------------------------------------------------------------------------------------------
// function songPacking(valuesArray,lengthsArray,timesArray){
//     let outputString = '';
//     outputString += valuesArray.join(',') + '|';
//     outputString += lengthsArray.join(',') + '|';
//     outputString += timesArray.join(',');
//     return outputString;
// }
//
// function songUnpacking(databaseString){
//     let unpackingArrays = databaseString.split('|');
//     let unpackedArrays = [];
//     for ( let i = 0 ; i < unpackingArrays.length ; i++){
//         unpackedArrays.push(unpackingArrays[i].split(','))
//     }
//     return unpackedArrays
// }
//
//
// // OPTIONAL TIME PROCESSING FUNCTIONS-----------------------------------------------------------------------------------
// function scheduleTiming(timingArray) {
//     let outputArray = [1],                                                              //song at 120bpm starts at 2 = 1:0:0, otherwise first note is skipped
//         currentTime = 1;                                                                //song at 120bpm starts at 2 = 1:0:0, otherwise first note is skipped
//     for (let i = 0; i < timingArray.length; i++) {
//         currentTime += Tone.Time(timingArray[i]).toSeconds();                           //converts the 8n/16n notation to seconds and adds it to the current time
//         outputArray.push(currentTime)
//     }
//     return outputArray;
// }
//
// function scheduleTimingBars(timingArray) {
//     let outputArray = [];
//     for (let i = 0; i < timingArray.length; i++) {
//         outputArray.push(Tone.Time(timingArray[i]).toBarsBeatsSixteenths())
//     }
//     return outputArray;
// }
//
// function msToBars(timingArray) {                                                        // convert an array of milliseconds into BarsBeatsSixteenths ('0:0:0')
//     let outputArray = [];
//     let adjustForZero;
//     let barNotation;
//     let roundedBarNotation;
//     for (let i = 0; i < timingArray.length; i++) {
//         adjustForZero = (timingArray[i])/1000;                                          //now can be used to covert
//         barNotation = Tone.Time(adjustForZero).toBarsBeatsSixteenths();
//         roundedBarNotation = barNotation.substring(0,barNotation.lastIndexOf(':')+4);
//         outputArray.push(roundedBarNotation)
//     }
//     return outputArray;
// }
//
// // BASS INSTRUMENT------------------------------------------------------------------------------------------------------
let arrayNotes = ['B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'B2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'D2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2', 'E2'];
noteLengths =["0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2"];
let barTiming = ["1:0:0","1:0:2","1:1:0","1:1:2","1:2:0","1:2:2","1:3:0","1:3:2","2:0:0","2:0:2","2:1:0","2:1:2","2:2:0","2:2:2","2:3:0","2:3:2","3:0:0","3:0:2","3:1:0","3:1:2","3:2:0","3:2:2","3:3:0","3:3:2","4:0:0","4:0:2","4:1:0","4:1:2","4:2:0","4:2:2","4:3:0","4:3:2"];
//
// // MELODY INSTRUMENT----------------------------------------------------------------------------------------------------
let arrayNotes2 = ['B3','B4','B3','B4','B3','B4','D4','F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4', 'B3', 'B3', 'B3', 'D4', 'F#4', 'D4', 'A4'];
noteLengths2 = ["0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:2","0:0:1","0:0:3","0:0:2","0:1:0","0:0:2","0:0:2","0:0:2","0:0:1","0:0:3","0:0:2","0:1:0","0:0:2","0:0:2","0:0:2","0:0:1","0:0:3","0:0:2","0:1:0","0:0:2","0:0:2","0:0:2","0:0:1","0:0:3","0:0:2","0:1:0"];
let barTiming2 = ["1:0:0","1:0:1","1:0:2","1:0:2","1:1:0","1:1:0","1:1:2","1:1:3","1:2:2","1:3:0","2:0:0","2:0:2","2:1:0","2:1:2","2:1:3","2:2:2","2:3:0","3:0:0","3:0:2","3:1:0","3:1:2","3:1:3","3:2:2","3:3:0","4:0:0","4:0:2","4:1:0","4:1:2","4:1:3","4:2:2","4:3:0"];
//
Tone.Transport.start();                                                                     //starts the song
playNotes(instrumentTypes[0],.3,arrayNotes2,noteLengths2,barTiming2);
playNotes(instrumentTypes[0],.6,arrayNotes,noteLengths,barTiming);
//
// // console.log(Tone.Time(.5).toNotation());                                                 //convert seconds into 2n,4n,or 8n (bpm defined on Tone)
// // console.log(Tone.Time('2n').toSeconds());                                                //convert 2n,4n,or 8n into seconds
// // console.log(Tone.Time(2.0).toBarsBeatsSixteenths());                                     //convert seconds into 0:0:0 (bars:Beats:sixteenths)
// // console.log(Tone.Time('4n').toBarsBeatsSixteenths());                                    //convert 2n,4n,or 8n into 0:0:0 (bars:Beats:sixteenths)
//
// // setTimeout(() => {
// //     Tone.Transport.stop()
// // }, 21000);
//
// // msArray = [1500,2000,3456,4000];
// // console.log(msToBars(msArray));
// // console.log(3.648 % 0.5);
//
// packedString = songPacking(arrayNotes,noteLengths,barTiming);
// console.log(packedString);
// unpackedArrayOfArrays = songUnpacking(packedString);
// console.log(unpackedArrayOfArrays);
// console.log(unpackedArrayOfArrays[0]);
// console.log(unpackedArrayOfArrays[1]);
// console.log(unpackedArrayOfArrays[2]);


// TRANSLATE FUNCTIONS------------------------------------------------------------------------------------------

sampleLengthArray = [[1,1,2],[4,5],[7,8]];
sampleTimingArray = [['4:0:0','6:0:0','7:0:0'],['0:3:0','1:0:0'],['0:0:0','1:0:0']];
function translateAA(lengthAA,timingAA){
    let valuesA = ['C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3','C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4'];
    let lAA = lengthAA;
    let tAA = timingAA;
    let earlyA;
    let outputArray = [[],[],[]];
    for(let i = 0 ; i < 30 ; i++ ){
        earlyA = 0;
        for(let j = 0 ; j < tAA.length; j++){
            if(tAA[earlyA][0] === undefined || tAA[earlyA][0] > tAA[j][0]){
                earlyA = j;
            }
        }
        if(tAA[earlyA][0] === undefined){
            break;
        }
        outputArray[0].push(valuesA[earlyA]);
        outputArray[1].push(lAA[earlyA][0]);
        outputArray[2].push(tAA[earlyA][0]);
        lAA[earlyA].shift();
        tAA[earlyA].shift();
    }
    return outputArray
}
console.log(translateAA(sampleLengthArray,sampleTimingArray));