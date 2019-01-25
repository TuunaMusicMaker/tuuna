let synth = new Tone.Synth();
let start;
let startMouseDownTime;
let notesArray = [];
let timingLengthsArray = [];
let timeStampArray = [];
let reRecording = 0;
let recording = false;
let instrumentTypes = ['triangle','sine','sawtooth'];
synth.toMaster();

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

function getCurrentTime() {
    if (start !== null) {
        let delta = Date.now() - start;
        return delta + "";
    }
}

function msToBars(timingLengthArray) {                                                        // convert an array of milliseconds into BarsBeatsSixteenths ('0:0:0')
    let outputArray = [];
    let sVal;
    let adjustForZero;
    let trimmed;
    let barNotation;
    let roundedBarNotation;
    for (let i = 0; i < timingLengthArray.length; i++) {
        adjustForZero = (timingLengthArray[i]) / 1000;
        barNotation = Tone.Time(adjustForZero).toBarsBeatsSixteenths();
        roundedBarNotation = barNotation.substring(0, barNotation.lastIndexOf(':') + 4);
        outputArray.push(roundedBarNotation)
    }
    return outputArray;
}



function getMouseDownTime() {
    if (startMouseDownTime !== null) {
        let deltaMouse = Date.now() - startMouseDownTime;
        return deltaMouse + "";
    }
}

function songPacking(valuesArray,lengthsArray,timesArray){
    let outputString = '';
    outputString += valuesArray.join(',') + '|';
    outputString += lengthsArray.join(',') + '|';
    outputString += timesArray.join(',');
    return outputString;
}

// $(document).keydown(function(e) {
//     if (e.originalEvent.keyCode === 81) {
//         $('#key1').addClass('whitekeypressed');
//         synth.triggerAttack('A4');
//     }
// });
//
// $(document).keyup(function(e) {
//     if (e.originalEvent.keyCode === 81) {
//         $('#key1').removeClass('whitekeypressed');
//         synth.triggerRelease();
//     }
// });

let octave = 4;


const keys = [];
let prevKey = 0;

//Notes object
const Notes = {

    //Object inside the Notes object
    keyboard: {
        // Lower octave.
        a: 'Clq',
        w: 'C#l',
        s: 'Dl',
        e: 'D#l',
        d: 'El',
        f: 'Fl',
        t: 'F#l',
        g: 'Gl',
        y: 'G#l',
        h: 'Al',
        u: 'A#l',
        j: 'Bl',
        // Upper octave.
        k: 'Cu',
        o: 'C#u',
        l: 'Du',
        p: 'D#u',
        ';': 'Eu',
        "'": 'Fu',
        ']': 'F#u',
        '\\': 'Gu',
    },
};

let NotesOnKeyboard = Notes.keyboard;

function keyToNotes(key) {
    const note = NotesOnKeyboard[key];
    if (!note){
        return;
    }

    return Tone.Frequency(note).toNote();

}

const keyToNote = key => {
    const note = NotesOnKeyboard[ key ];
    if ( !note ) {
        return;
    }

    return Tone.Frequency(
        note
            .replace( 'l', octave )
            .replace( 'u', octave + 1 )
    ).toNote();
};

const onKeyDown = (() => {
    let listener;

    return synth => {
        document.removeEventListener( 'keydown', listener );
        startMouseDownTime = Date.now();

        listener = event => {
            const { key } = event;

            // Only trigger once per keydown event.
            if ( !keys[ key ] ) {
                keys[ key ] = true;

                const note = keyToNote( key );
                if ( note ) {
                    synth.triggerAttack( note );
                    prevKey = key;
                }
            }
        };

        document.addEventListener( 'keydown', listener );
    };
})();

const onKeyUp = (() => {
    let listener;
    let prev;

    return synth => {
        // Clean-up.
        if ( prev ) {
            prev.triggerRelease();
        }

        document.removeEventListener( 'keyup', listener );

        prev = synth;
        listener = event => {
            const { key } = event;
            if ( keys[ key ] ) {
                keys[ key ] = false;

                const note = keyToNote( key );
                if ( synth instanceof Tone.PolySynth ) {
                    synth.triggerRelease( note );
                } else if ( note && key === prevKey ) {
                    // Trigger release if this is the previous note played.
                    synth.triggerRelease();
                }
            }
        };

        document.addEventListener( 'keyup', listener );
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    };
})();

// // Octave controls.
// document.addEventListener( 'keydown', event => {
//     // Decrease octave range (min: 0).
//     if ( event.key === 'z' ) { octave = Math.max( octave - 1, 0 ); }
//     // Increase octave range (max: 10).
//     if ( event.key === 'x' ) { octave = Math.min( octave + 1, 9 ); }
// });

// Init.
(() => {
    const synth = new Tone.PolySynth( 10 );
    synth.toMaster();

    onKeyDown( synth );
    onKeyUp( synth );
})();




$('#key1').mousedown(function() {
    synth.triggerAttack('C3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('C3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key1').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key1').removeClass('activekey');




});

$('#key1').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key1').removeClass('activekey');


});


$('#recButton').addClass("notRec");

$('#recButton').click(function(){

    if($('#recButton').hasClass('notRec')){
        $('#recButton').removeClass("notRec");
        $('#recButton').addClass("Rec");
        if (reRecording === 1) {
            notesArray = [];
            timingLengthsArray = [];
            timeStampArray = [];
        }
        recording = true;

        start = Date.now();

    }
    else{
        $('#recButton').removeClass("Rec");
        $('#recButton').addClass("notRec");
        recording = false;
        start = null;
        console.count();
        reRecording = 1;
    }
});


$(document).on('click', '#playButton', function(){
    let convertedLengthArray= msToBars(timingLengthsArray);
    let convertedTimeStampArray = msToBars(timeStampArray);

    Tone.Transport.clear();
    Tone.Transport.stop();

    Tone.Transport.start();
    playNotes(instrumentTypes[0],.8,notesArray,convertedLengthArray,convertedTimeStampArray);

    console.log(notesArray);
    console.log(msToBars(timingLengthsArray));

    console.log(msToBars(timeStampArray));
});

$(document).on('click', '#saveButton', function(){
    let packingLengthArray= msToBars(timingLengthsArray);
    let packingTimeStampArray = msToBars(timeStampArray);
    let songString = songPacking(notesArray,packingLengthArray,packingTimeStampArray);
    console.log(songString);
    $("#songHash").val(songString);
});