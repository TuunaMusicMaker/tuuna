let synth = new Tone.Synth();
let start;
let startMouseDownTime = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
let notesArray = [];
let timingLengthsArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
let timeStampArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
let reRecording = 0;
let recording = false;
let instrumentTypes = ['triangle','sine','sawtooth'];
let songInputs;
synth.toMaster();

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

function getCurrentTime() {
    if (start !== null) {
        return Date.now() - start;
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



function getMouseDownTime(keyValue) {
    // if (startMouseDownTime[keyValue] !== null) {
        return Date.now() - startMouseDownTime[keyValue];
    // }
}

function songPacking(valuesArray,lengthsArray,timesArray){
    let outputString = '';
    outputString += valuesArray.join(',') + '|';
    outputString += lengthsArray.join(',') + '|';
    outputString += timesArray.join(',');
    return outputString;
}

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

// let octave = 4;
const keys = [];
let prevKey = 0;

//Notes object
const Notes = {

    //Object inside the Notes object
    keyboard: {
        // Lower octave.
        q: 'C3',
        '2': 'C#3',
        w: 'D3',
        '3': 'D#3',
        e: 'E3',
        r: 'F3',
        '5': 'F#3',
        t: 'G3',
        '6': 'G#3',
        y: 'A3',
        '7': 'A#3',
        u: 'B3',
        // Upper octave.
        v: 'C4',
        g: 'C#4',
        b: 'D4',
        h: 'D#4',
        n: 'E4',
        m: 'F4',
        k: 'F#4',
        ',': 'G4',
        l: 'G#4',
        '.': 'A4',
        ';': 'A#4',
        '/': 'B4',
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

// const keyToNote = key => {
//     const note = NotesOnKeyboard[ key ];
//     if ( !note ) {
//         return;
//     }
//
//     return Tone.Frequency(
//         note
//             .replace( 'l', octave )
//             .replace( 'u', octave + 1 )
//     ).toNote();
// };

const onKeyDown = (() => {
    let listener;

    return synth => {
        document.removeEventListener( 'keydown', listener );

        listener = event => {
            const { key } = event;

            // Only trigger once per keydown event.
            if ( !keys[ key ] ) {
                // startMouseDownTime[0] = Date.now();
                keys[ key ] = true;

                const note = keyToNotes( key );
                if ( note ) {
                    switch (note) {
                        case 'C3':
                            $(document).ready(function () {
                                $('#key1').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[0] = Date.now();
                                timeStampArray[0].push(getCurrentTime());
                            }
                            break;
                        case 'C#3':
                            $(document).ready(function () {
                                $('#key2').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[1] = Date.now();
                                timeStampArray[1].push(getCurrentTime());
                            }
                            break;
                        case 'D3':
                            $(document).ready(function () {
                                $('#key3').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[2] = Date.now();
                                timeStampArray[2].push(getCurrentTime());
                            }
                            break;
                        case 'D#3':
                            $(document).ready(function () {
                                $('#key4').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[3] = Date.now();
                                timeStampArray[3].push(getCurrentTime());
                            }
                            break;
                        case 'E3':
                            $(document).ready(function () {
                                $('#key5').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[4] = Date.now();
                                timeStampArray[4].push(getCurrentTime());
                            }
                            break;
                        case 'F3':
                            $(document).ready(function () {
                                $('#key6').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[5] = Date.now();
                                timeStampArray[5].push(getCurrentTime());
                            }
                            break;
                        case 'F#3':
                            $(document).ready(function () {
                                $('#key7').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[6] = Date.now();
                            }
                            timeStampArray[6].push(getCurrentTime());
                            break;
                        case 'G3':
                            $(document).ready(function () {
                                $('#key8').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[7] = Date.now();
                                timeStampArray[7].push(getCurrentTime());
                            }
                            break;
                        case 'G#3':
                            $(document).ready(function () {
                                $('#key9').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[8] = Date.now();
                                timeStampArray[8].push(getCurrentTime());
                            }
                            break;
                        case 'A3':
                            $(document).ready(function () {
                                $('#key10').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[9] = Date.now();
                                timeStampArray[9].push(getCurrentTime());
                            }
                            break;
                        case 'A#3':
                            $(document).ready(function () {
                                $('#key11').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[10] = Date.now();
                                timeStampArray[10].push(getCurrentTime());
                            }
                            break;
                        case 'B3':
                            $(document).ready(function () {
                                $('#key12').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[11] = Date.now();
                                timeStampArray[11].push(getCurrentTime());
                            }
                            break;
                        case 'C4':
                            $(document).ready(function () {
                                $('#key13').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[12] = Date.now();
                                timeStampArray[12].push(getCurrentTime());
                            }
                            break;
                        case 'C#4':
                            $(document).ready(function () {
                                $('#key14').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[13] = Date.now();
                                timeStampArray[13].push(getCurrentTime());
                            }
                            break;
                        case 'D4':
                            $(document).ready(function () {
                                $('#key15').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[14] = Date.now();
                                timeStampArray[14].push(getCurrentTime());
                            }
                            break;
                        case 'D#4':
                            $(document).ready(function () {
                                $('#key16').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[15] = Date.now();
                                timeStampArray[15].push(getCurrentTime());
                            }
                            break;
                        case 'E4':
                            $(document).ready(function () {
                                $('#key17').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[16] = Date.now();
                                timeStampArray[16].push(getCurrentTime());
                            }
                            break;
                        case 'F4':
                            $(document).ready(function () {
                                $('#key18').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[17] = Date.now();
                                timeStampArray[17].push(getCurrentTime());
                            }
                            break;
                        case 'F#4':
                            $(document).ready(function () {
                                $('#key19').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[18] = Date.now();
                                timeStampArray[18].push(getCurrentTime());
                            }
                            break;
                        case 'G4':
                            $(document).ready(function () {
                                $('#key20').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[19] = Date.now();
                                timeStampArray[19].push(getCurrentTime());
                            }
                            break;
                        case 'G#4':
                            $(document).ready(function () {
                                $('#key21').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[20] = Date.now();
                                timeStampArray[20].push(getCurrentTime());
                            }
                            break;
                        case 'A4':
                            $(document).ready(function () {
                                $('#key22').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[21] = Date.now();
                                timeStampArray[21].push(getCurrentTime());
                            }
                            break;
                        case 'A#4':
                            $(document).ready(function () {
                                $('#key23').addClass('blackkeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[22] = Date.now();
                                timeStampArray[22].push(getCurrentTime());
                            }
                            break;
                        case 'B4':
                            $(document).ready(function () {
                                $('#key24').addClass('whitekeypressed');
                            });
                            if(recording === true) {
                                startMouseDownTime[23] = Date.now();
                                timeStampArray[23].push(getCurrentTime());
                            }
                            break;
                    }
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

        if ( prev ) {
            prev.triggerRelease();
        }

        document.removeEventListener( 'keyup', listener );

        prev = synth;
        listener = event => {


            const { key } = event;
            if ( keys[ key ] ) {
                keys[ key ] = false;
                // if (recording === true) {
                //     timingLengthsArray[0].push(getMouseDownTime(0));
                // }

                const note = keyToNotes( key );
                if ( synth instanceof Tone.PolySynth ) {
                    synth.triggerRelease( note );
                    switch (note) {
                        case 'C3':
                            $(document).ready(function () {
                                $('#key1').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[0].push(getMouseDownTime(0));
                            }
                            break;
                        case 'C#3':
                            $(document).ready(function () {
                                $('#key2').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[1].push(getMouseDownTime(1));
                            }
                            break;
                        case 'D3':
                            $(document).ready(function () {
                                $('#key3').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[2].push(getMouseDownTime(2));
                            }
                            break;
                        case 'D#3':
                            $(document).ready(function () {
                                $('#key4').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[3].push(getMouseDownTime(3));
                            }
                            break;
                        case 'E3':
                            $(document).ready(function () {
                                $('#key5').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[4].push(getMouseDownTime(4));
                            }
                            break;
                        case 'F3':
                            $(document).ready(function () {
                                $('#key6').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[5].push(getMouseDownTime(5));
                            }
                            break;
                        case 'F#3':
                            $(document).ready(function () {
                                $('#key7').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[6].push(getMouseDownTime(6));
                            }
                            break;
                        case 'G3':
                            $(document).ready(function () {
                                $('#key8').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[7].push(getMouseDownTime(7));
                            }
                            break;
                        case 'G#3':
                            $(document).ready(function () {
                                $('#key9').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[8].push(getMouseDownTime(8));
                            }
                            break;
                        case 'A3':
                            $(document).ready(function () {
                                $('#key10').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[9].push(getMouseDownTime(9));
                            }
                            break;
                        case 'A#3':
                            $(document).ready(function () {
                                $('#key11').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[10].push(getMouseDownTime(10));
                            }
                            break;
                        case 'B3':
                            $(document).ready(function () {
                                $('#key12').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[11].push(getMouseDownTime(11));
                            }
                            break;
                        case 'C4':
                            $(document).ready(function () {
                                $('#key13').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[12].push(getMouseDownTime(12));
                            }
                            break;
                        case 'C#4':
                            $(document).ready(function () {
                                $('#key14').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[13].push(getMouseDownTime(13));
                            }
                            break;
                        case 'D4':
                            $(document).ready(function () {
                                $('#key15').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[14].push(getMouseDownTime(14));
                            }
                            break;
                        case 'D#4':
                            $(document).ready(function () {
                                $('#key16').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[15].push(getMouseDownTime(15));
                            }
                            break;
                        case 'E4':
                            $(document).ready(function () {
                                $('#key17').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[16].push(getMouseDownTime(16));
                            }
                            break;
                        case 'F4':
                            $(document).ready(function () {
                                $('#key18').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[17].push(getMouseDownTime(17));
                            }
                            break;
                        case 'F#4':
                            $(document).ready(function () {
                                $('#key19').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[18].push(getMouseDownTime(18));
                            }
                            break;
                        case 'G4':
                            $(document).ready(function () {
                                $('#key20').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[19].push(getMouseDownTime(19));
                            }
                            break;
                        case 'G#4':
                            $(document).ready(function () {
                                $('#key21').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[20].push(getMouseDownTime(20));
                            }
                            break;
                        case 'A4':
                            $(document).ready(function () {
                                $('#key22').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[21].push(getMouseDownTime(21));
                            }
                            break;
                        case 'A#4':
                            $(document).ready(function () {
                                $('#key23').removeClass('blackkeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[22].push(getMouseDownTime(22));
                            }
                            break;
                        case 'B4':
                            $(document).ready(function () {
                                $('#key24').removeClass('whitekeypressed');
                            });
                            if(recording === true) {
                                timingLengthsArray[23].push(getMouseDownTime(23));
                            }
                            break;
                    }
                } else if ( note && key === prevKey ) {
                    // Trigger release if this is the previous note played.
                    synth.triggerRelease();
                }
            }
        };

        document.addEventListener( 'keyup', listener );
    };
})();
// Init.
(() => {
    const synth = new Tone.PolySynth( 10 );
    synth.toMaster();

        onKeyDown(synth);
        onKeyUp(synth);
})();




$('#key1').mousedown(function() {
    synth.triggerAttack('C3');
    startMouseDownTime[0] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
            timeStampArray[0].push(getCurrentTime())
        }

});

$('#key1').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[0].push(getMouseDownTime(0));
        }
    }
    $('#key1').removeClass('activekey');
    $('#key1').removeClass('whiteactivekey');

});

$('#key1').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[0].push(getMouseDownTime(0));
        }
    }
    $('#key1').removeClass('activekey');
    $('#key1').removeClass('whiteactivekey');

});

$('#key2').mousedown(function() {
    synth.triggerAttack('C#3');
    startMouseDownTime[1] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');


    if (recording === true) {
            timeStampArray[1].push(getCurrentTime())
        }
});

$('#key2').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[1].push(getMouseDownTime(1));
        }
    }
    $('#key2').removeClass('activekey');
    $('#key2').removeClass('blackactivekey');


});

$('#key2').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[1].push(getMouseDownTime(1));
        }
    }
    $('#key2').removeClass('activekey');
    $('#key2').removeClass('blackactivekey');

});

$('#key3').mousedown(function() {
    synth.triggerAttack('D3');
    startMouseDownTime[2] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
            timeStampArray[2].push(getCurrentTime())
        }

});

$('#key3').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[2].push(getMouseDownTime(2));
        }
    }
    $('#key3').removeClass('activekey');
    $('#key3').removeClass('whiteactivekey');

});

$('#key3').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[2].push(getMouseDownTime(2));
        }
    }
    $('#key3').removeClass('activekey');
    $('#key3').removeClass('whiteactivekey');

});

$('#key4').mousedown(function() {
    synth.triggerAttack('D#3');
    startMouseDownTime[3] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');

    if (recording === true) {
        timeStampArray[3].push(getCurrentTime())
    }

});

$('#key4').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[3].push(getMouseDownTime(3));
        }
    }
    $('#key4').removeClass('activekey');
    $('#key4').removeClass('blackactivekey');
});

$('#key4').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[3].push(getMouseDownTime(3));
        }
    }
    $('#key4').removeClass('activekey');
    $('#key4').removeClass('blackactivekey');

});

$('#key5').mousedown(function() {
    synth.triggerAttack('E3');
    startMouseDownTime[4] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[4].push(getCurrentTime())
    }

});

$('#key5').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[4].push(getMouseDownTime(4));
        }
    }
    $('#key5').removeClass('activekey');
    $('#key5').removeClass('whiteactivekey');
});

$('#key5').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[4].push(getMouseDownTime(4));
        }
    }
    $('#key5').removeClass('activekey');
    $('#key5').removeClass('whiteactivekey');

});

$('#key6').mousedown(function() {
    synth.triggerAttack('F3');
    startMouseDownTime[5] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');


    if (recording === true) {
        timeStampArray[5].push(getCurrentTime())
    }

});

$('#key6').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[5].push(getMouseDownTime(5));
        }
    }
    $('#key6').removeClass('activekey');
    $('#key6').removeClass('whiteactivekey');
});

$('#key6').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[5].push(getMouseDownTime(5));
        }
    }
    $('#key6').removeClass('activekey');
    $('#key6').removeClass('whiteactivekey');

});

$('#key7').mousedown(function() {
    synth.triggerAttack('F#3');
    startMouseDownTime[6] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');


    if (recording === true) {
        timeStampArray[6].push(getCurrentTime())
    }

});

$('#key7').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[6].push(getMouseDownTime(6));
        }
    }
    $('#key7').removeClass('activekey');
    $('#key7').removeClass('blackactivekey');
});

$('#key7').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[6].push(getMouseDownTime(6));
        }
    }
    $('#key7').removeClass('activekey');
    $('#key7').removeClass('blackactivekey');

});

$('#key8').mousedown(function() {
    synth.triggerAttack('G3');
    startMouseDownTime[7] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[7].push(getCurrentTime())
    }

});

$('#key8').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[7].push(getMouseDownTime(7));
        }
    }
    $('#key8').removeClass('activekey');
    $('#key8').removeClass('whiteactivekey');

});

$('#key8').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[7].push(getMouseDownTime(7));
        }
    }
    $('#key8').removeClass('activekey');
    $('#key8').removeClass('whiteactivekey');

});

$('#key9').mousedown(function() {
    synth.triggerAttack('G#3');
    startMouseDownTime[8] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');


    if (recording === true) {
        timeStampArray[8].push(getCurrentTime())
    }

});

$('#key9').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[8].push(getMouseDownTime(8));
        }
    }
    $('#key9').removeClass('activekey');
    $('#key9').removeClass('blackactivekey');
});

$('#key9').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[8].push(getMouseDownTime(8));
        }
    }
    $('#key9').removeClass('activekey');
    $('#key9').removeClass('blackactivekey');

});

$('#key10').mousedown(function() {
    synth.triggerAttack('A3');
    startMouseDownTime[9] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[9].push(getCurrentTime())
    }

});

$('#key10').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[9].push(getMouseDownTime(9));
        }
    }
    $('#key10').removeClass('activekey');
    $('#key10').removeClass('whiteactivekey');

});

$('#key10').mouseout(function() {
    synth.triggerRelease();

    if ($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[9].push(getMouseDownTime(9));
        }
    }
    $('#key10').removeClass('activekey');
    $('#key10').removeClass('whiteactivekey');


});

$('#key11').mousedown(function() {
    synth.triggerAttack('A#3');
    startMouseDownTime[10] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');

    if (recording === true) {
        timeStampArray[10].push(getCurrentTime())
    }

});

$('#key11').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[10].push(getMouseDownTime(10));
        }
    }
    $('#key11').removeClass('activekey');
    $('#key11').removeClass('blackactivekey');
});

$('#key11').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[10].push(getMouseDownTime(10));
        }
    }
    $('#key11').removeClass('activekey');
    $('#key11').removeClass('blackactivekey');


});

$('#key12').mousedown(function() {
    synth.triggerAttack('B3');
    startMouseDownTime[11] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[11].push(getCurrentTime())
    }

});

$('#key12').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[11].push(getMouseDownTime(11));
        }
    }
    $('#key12').removeClass('activekey');
    $('#key12').removeClass('whiteactivekey');

});

$('#key12').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[11].push(getMouseDownTime(11));
        }
    }
    $('#key12').removeClass('activekey');
    $('#key12').removeClass('whiteactivekey');

});

$('#key13').mousedown(function() {
    synth.triggerAttack('C4');
    startMouseDownTime[12] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[12].push(getCurrentTime())
    }
});

$('#key13').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[12].push(getMouseDownTime(12));
        }
    }
    $('#key13').removeClass('activekey');
    $('#key13').removeClass('whiteactivekey');

});

$('#key13').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[12].push(getMouseDownTime(12));
        }
    }
    $('#key13').removeClass('activekey');
    $('#key13').removeClass('whiteactivekey');

});

$('#key14').mousedown(function() {
    synth.triggerAttack('C#4');
    startMouseDownTime[13] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');

    if (recording === true) {
        timeStampArray[13].push(getCurrentTime())
    }

});

$('#key14').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[13].push(getMouseDownTime(13));
        }
    }
    $('#key14').removeClass('activekey');
    $('#key14').removeClass('blackactivekey');
});

$('#key14').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[13].push(getMouseDownTime(13));
        }
    }
    $('#key14').removeClass('activekey');
    $('#key14').removeClass('blackactivekey');


});

$('#key15').mousedown(function() {
    synth.triggerAttack('D4');
    startMouseDownTime[14] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[14].push(getCurrentTime())
    }
});

$('#key15').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[14].push(getMouseDownTime(14));
        }
    }
    $('#key15').removeClass('activekey');
    $('#key15').removeClass('whiteactivekey');
});

$('#key15').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[14].push(getMouseDownTime(14));
        }
    }
    $('#key15').removeClass('activekey');
    $('#key15').removeClass('whiteactivekey');

});

$('#key16').mousedown(function() {
    synth.triggerAttack('D#4');
    startMouseDownTime[15] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');

    if (recording === true) {
        timeStampArray[15].push(getCurrentTime())
    }

});

$('#key16').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[15].push(getMouseDownTime(15));
        }
    }
    $('#key16').removeClass('activekey');
    $('#key16').removeClass('blackactivekey');
});

$('#key16').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[15].push(getMouseDownTime(15));
        }
    }
    $('#key16').removeClass('activekey');
    $('#key16').removeClass('blackactivekey');

});

$('#key17').mousedown(function() {
    synth.triggerAttack('E4');
    startMouseDownTime[16] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[16].push(getCurrentTime())
    }

});

$('#key17').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[16].push(getMouseDownTime(16));
        }
    }
    $('#key17').removeClass('activekey');
    $('#key17').removeClass('whiteactivekey');
});

$('#key17').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[16].push(getMouseDownTime(16));
        }
    }
    $('#key17').removeClass('activekey');
    $('#key17').removeClass('whiteactivekey');

});

$('#key18').mousedown(function() {
    synth.triggerAttack('F4');
    startMouseDownTime[17] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[17].push(getCurrentTime())
    }

});

$('#key18').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[17].push(getMouseDownTime(17));
        }
    }
    $('#key18').removeClass('activekey');
    $('#key18').removeClass('whiteactivekey');
});

$('#key18').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[17].push(getMouseDownTime(17));
        }
    }
    $('#key18').removeClass('activekey');
    $('#key18').removeClass('whiteactivekey');

});

$('#key19').mousedown(function() {
    synth.triggerAttack('F#4');
    startMouseDownTime[18] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');

    if (recording === true) {
        timeStampArray[18].push(getCurrentTime())
    }

});

$('#key19').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[18].push(getMouseDownTime(18));
        }
    }
    $('#key19').removeClass('activekey');
    $('#key19').removeClass('blackactivekey');
});

$('#key19').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[18].push(getMouseDownTime(18));
        }
    }
    $('#key19').removeClass('activekey');
    $('#key19').removeClass('blackactivekey');

});

$('#key20').mousedown(function() {
    synth.triggerAttack('G4');
    startMouseDownTime[19] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[19].push(getCurrentTime())
    }

});

$('#key20').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[19].push(getMouseDownTime(19));
        }
    }
    $('#key20').removeClass('activekey');
    $('#key20').removeClass('whiteactivekey');
});

$('#key20').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[19].push(getMouseDownTime(19));
        }
    }
    $('#key20').removeClass('activekey');
    $('#key20').removeClass('whiteactivekey');

});

$('#key21').mousedown(function() {
    synth.triggerAttack('G#4');
    startMouseDownTime[20] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');

    if (recording === true) {
        timeStampArray[20].push(getCurrentTime())
    }

});

$('#key21').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[20].push(getMouseDownTime(20));
        }
    }
    $('#key21').removeClass('activekey');
    $('#key21').removeClass('blackactivekey');
});

$('#key21').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[20].push(getMouseDownTime(20));
        }
    }
    $('#key21').removeClass('activekey');
    $('#key21').removeClass('blackactivekey');

});

$('#key22').mousedown(function() {
    synth.triggerAttack('A4');
    startMouseDownTime[21] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[21].push(getCurrentTime())
    }

});

$('#key22').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[21].push(getMouseDownTime(21));
        }
    }
    $('#key22').removeClass('activekey');
    $('#key22').removeClass('whiteactivekey');
});

$('#key22').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[21].push(getMouseDownTime(21));
        }
    }
    $('#key22').removeClass('activekey');
    $('#key22').removeClass('whiteactivekey');

});

$('#key23').mousedown(function() {
    synth.triggerAttack('A#4');
    startMouseDownTime[22] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('blackactivekey');

    if (recording === true) {
        timeStampArray[22].push(getCurrentTime())
    }

});

$('#key23').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[22].push(getMouseDownTime(22));
        }
    }
    $('#key23').removeClass('activekey');
    $('#key23').removeClass('blackactivekey');
});

$('#key23').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[22].push(getMouseDownTime(22));
        }
    }
    $('#key23').removeClass('activekey');
    $('#key23').removeClass('blackactivekey');

});

$('#key24').mousedown(function() {
    synth.triggerAttack('B4');
    startMouseDownTime[23] = Date.now();
    $(this).addClass('activekey');
    $(this).addClass('whiteactivekey');

    if (recording === true) {
        timeStampArray[23].push(getCurrentTime())
    }

});

$('#key24').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[23].push(getMouseDownTime(23));
        }
    }
    $('#key24').removeClass('activekey');
    $('#key24').removeClass('whiteactivekey');
});

$('#key24').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray[23].push(getMouseDownTime(23));
        }
    }
    $('#key24').removeClass('activekey');
    $('#key24').removeClass('blackactivekey');

});


$('#recButton').addClass("notRec");

$('#recButton').click(function(){

    if($('#recButton').hasClass('notRec')){
        $('#recButton').removeClass("notRec");
        $('#recButton').addClass("Rec");
        if (reRecording === 1) {
            timingLengthsArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            timeStampArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
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
        songInputs = translateAA(timingLengthsArray,timeStampArray);
        songInputs[1] = msToBars(songInputs[1]);
        songInputs[2] = msToBars(songInputs[2]);
        let songString = songPacking(songInputs[0],songInputs[1],songInputs[2]);
        $("#songHash").val(songString);
    }
});


$(document).on('click', '#playButton', function(){
    Tone.Transport.clear();
    Tone.Transport.stop();
    Tone.Transport.start();

    playNotes(instrumentTypes[0],.8,songInputs[0],songInputs[1],songInputs[2]);
});

// $(document).on('click', '#saveButton', function(){
//     let packingLengthArray= msToBars(timingLengthsArray);
//     let packingTimeStampArray = msToBars(timeStampArray);
//     let songString = songPacking(songInputs[0],songInputs[1],songInputs[2]);
//     console.log(songString);
//     $("#songHash").val(songString);
// });

// $(document).keydown(function(e) {
//     if (e.originalEvent.keyCode === 81 && triggeredArray[0] === false) {
//             startMouseDownTime[0] = Date.now();
//             $('#key1').addClass('whitekeypressed');
//             synth.triggerAttack('C3');
//             triggeredArray[0] = true;
//             if (recording === true) {
//                 timeStampArray[0].push(getCurrentTime())
//             }
//     }
//
// });
//
// $(document).keyup(function(e) {
//     if (e.originalEvent.keyCode === 81) {
//         $('#key1').removeClass('whitekeypressed');
//         if (recording === true) {
//             timingLengthsArray[0].push(getMouseDownTime(0));
//         }
//         triggeredArray[0] = false;
//     }
//         synth.triggerRelease('C3');
// });

$('#title').focusin(function() {
    onKeyDown(null);
    onKeyUp(null);
});

$('#title').focusout(function() {
    const synth = new Tone.PolySynth( 10 );
    synth.toMaster();

    onKeyDown(synth);
    onKeyUp(synth);});

$('#description').focusin(function() {
    onKeyDown(null);
    onKeyUp(null);
});

$('#description').focusout(function() {
    const synth = new Tone.PolySynth( 10 );
    synth.toMaster();

    onKeyDown(synth);
    onKeyUp(synth);});