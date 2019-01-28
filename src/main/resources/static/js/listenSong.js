let synth = new Tone.Synth();
synth.toMaster();
let instrumentTypes = ['triangle','sine','sawtooth'];
let retrievedSongArrays;

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

function playNote(instantiatedInstrument,noteValue,noteLength,noteTime){                    //instantiatedInstrument = createInstrument(cInstrument, cVolume)
    Tone.Transport.scheduleOnce(function (time) {instantiatedInstrument.triggerAttackRelease(noteValue, noteLength, time)}, noteTime);
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

function songUnpacking(databaseString){
    let unpackingArrays = databaseString.split('|');
    let unpackedArrays = [];
    for ( let i = 0 ; i < unpackingArrays.length ; i++){
        unpackedArrays.push(unpackingArrays[i].split(','))
    }
    return unpackedArrays
}

$(document).ready(function(){
    let retrievedSongString = $('#songHash').val();
    retrievedSongArrays = songUnpacking(retrievedSongString);
});

$(document).on('click', '#playbackButton', function(){
    Tone.Transport.clear();
    Tone.Transport.stop();
    Tone.Transport.start();
    console.log(retrievedSongArrays);
    playNotes(instrumentTypes[0],0.8,retrievedSongArrays[0],retrievedSongArrays[1],retrievedSongArrays[2])
});