let retrievedSongString;

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
    console.log(retrievedSongString);
});

$(document).on('click', '#playbackButton', function(){
    console.log(retrievedSongString);
});