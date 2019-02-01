let synth = new Tone.Synth();
let start;
let startMouseDownTime = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
let timingLengthsArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
let timeStampArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
let reRecording = 0;
let recording = false;
let instrumentTypes = ['triangle','sine','sawtooth'];
let songInputs;
synth.toMaster();

function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

const isMobile = mobileCheck();

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
        return Date.now() - startMouseDownTime[keyValue];
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

const onKeyDown = (() => {
    let listener;

    return synth => {
        document.removeEventListener( 'keydown', listener );

        listener = event => {
            const { key } = event;

            // Only trigger once per keydown event.
            if ( !keys[ key ] ) {
                keys[ key ] = true;

                const note = keyToNotes( key );
                if ( note ) {
                    switch (note) {
                        case 'C3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key1').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[0] = Date.now();
                                timeStampArray[0].push(getCurrentTime());
                            }
                            break;
                        case 'C#3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key2').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[1] = Date.now();
                                timeStampArray[1].push(getCurrentTime());
                            }
                            break;
                        case 'D3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key3').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[2] = Date.now();
                                timeStampArray[2].push(getCurrentTime());
                            }
                            break;
                        case 'D#3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key4').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[3] = Date.now();
                                timeStampArray[3].push(getCurrentTime());
                            }
                            break;
                        case 'E3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key5').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[4] = Date.now();
                                timeStampArray[4].push(getCurrentTime());
                            }
                            break;
                        case 'F3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key6').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[5] = Date.now();
                                timeStampArray[5].push(getCurrentTime());
                            }
                            break;
                        case 'F#3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key7').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[6] = Date.now();
                            }
                            timeStampArray[6].push(getCurrentTime());
                            break;
                        case 'G3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key8').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[7] = Date.now();
                                timeStampArray[7].push(getCurrentTime());
                            }
                            break;
                        case 'G#3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key9').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[8] = Date.now();
                                timeStampArray[8].push(getCurrentTime());
                            }
                            break;
                        case 'A3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key10').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[9] = Date.now();
                                timeStampArray[9].push(getCurrentTime());
                            }
                            break;
                        case 'A#3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key11').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[10] = Date.now();
                                timeStampArray[10].push(getCurrentTime());
                            }
                            break;
                        case 'B3':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key12').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[11] = Date.now();
                                timeStampArray[11].push(getCurrentTime());
                            }
                            break;
                        case 'C4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key13').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[12] = Date.now();
                                timeStampArray[12].push(getCurrentTime());
                            }
                            break;
                        case 'C#4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key14').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[13] = Date.now();
                                timeStampArray[13].push(getCurrentTime());
                            }
                            break;
                        case 'D4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key15').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[14] = Date.now();
                                timeStampArray[14].push(getCurrentTime());
                            }
                            break;
                        case 'D#4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key16').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[15] = Date.now();
                                timeStampArray[15].push(getCurrentTime());
                            }
                            break;
                        case 'E4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key17').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[16] = Date.now();
                                timeStampArray[16].push(getCurrentTime());
                            }
                            break;
                        case 'F4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key18').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[17] = Date.now();
                                timeStampArray[17].push(getCurrentTime());
                            }
                            break;
                        case 'F#4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key19').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[18] = Date.now();
                                timeStampArray[18].push(getCurrentTime());
                            }
                            break;
                        case 'G4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key20').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[19] = Date.now();
                                timeStampArray[19].push(getCurrentTime());
                            }
                            break;
                        case 'G#4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key21').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[20] = Date.now();
                                timeStampArray[20].push(getCurrentTime());
                            }
                            break;
                        case 'A4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key22').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[21] = Date.now();
                                timeStampArray[21].push(getCurrentTime());
                            }
                            break;
                        case 'A#4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key23').addClass('blackkeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[22] = Date.now();
                                timeStampArray[22].push(getCurrentTime());
                            }
                            break;
                        case 'B4':
                            $(document).ready(function () {
                                if(synth !== null) {
                                    $('#key24').addClass('whitekeypressed');
                                }
                            });
                            if(recording === true) {
                                startMouseDownTime[23] = Date.now();
                                timeStampArray[23].push(getCurrentTime());
                            }
                            break;
                    }
                    if (synth !== null) {
                        synth.triggerAttack(note);
                        prevKey = key;
                    }
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
                    if (synth !== null) {
                        synth.triggerRelease();
                    }
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

if(isMobile === false) {
    $("#key1").on('mousedown', function () {
        synth.triggerAttack('C3');
        startMouseDownTime[0] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[0].push(getCurrentTime())
        }

    });

    $("#key1").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[0].push(getMouseDownTime(0));
            }
        }
        $('#key1').removeClass('activekey');
        $('#key1').removeClass('whiteactivekey');

    });

    $("#key1").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[0].push(getMouseDownTime(0));
            }
        }
        $('#key1').removeClass('activekey');
        $('#key1').removeClass('whiteactivekey');

    });

    $("#key2").on('mousedown', function () {
        synth.triggerAttack('C#3');
        startMouseDownTime[1] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');


        if (recording === true) {
            timeStampArray[1].push(getCurrentTime())
        }
    });

    $("#key2").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[1].push(getMouseDownTime(1));
            }
        }
        $('#key2').removeClass('activekey');
        $('#key2').removeClass('blackactivekey');


    });

    $("#key2").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[1].push(getMouseDownTime(1));
            }
        }
        $('#key2').removeClass('activekey');
        $('#key2').removeClass('blackactivekey');

    });

    $("#key3").on('mousedown', function () {
        synth.triggerAttack('D3');
        startMouseDownTime[2] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[2].push(getCurrentTime())
        }

    });

    $("#key3").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[2].push(getMouseDownTime(2));
            }
        }
        $('#key3').removeClass('activekey');
        $('#key3').removeClass('whiteactivekey');

    });

    $("#key3").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[2].push(getMouseDownTime(2));
            }
        }
        $('#key3').removeClass('activekey');
        $('#key3').removeClass('whiteactivekey');

    });

    $("#key4").on('mousedown', function () {
        synth.triggerAttack('D#3');
        startMouseDownTime[3] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[3].push(getCurrentTime())
        }

    });

    $("#key4").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[3].push(getMouseDownTime(3));
            }
        }
        $('#key4').removeClass('activekey');
        $('#key4').removeClass('blackactivekey');
    });

    $("#key4").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[3].push(getMouseDownTime(3));
            }
        }
        $('#key4').removeClass('activekey');
        $('#key4').removeClass('blackactivekey');

    });

    $("#key5").on('mousedown', function () {
        synth.triggerAttack('E3');
        startMouseDownTime[4] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[4].push(getCurrentTime())
        }

    });

    $("#key5").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[4].push(getMouseDownTime(4));
            }
        }
        $('#key5').removeClass('activekey');
        $('#key5').removeClass('whiteactivekey');
    });

    $("#key5").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[4].push(getMouseDownTime(4));
            }
        }
        $('#key5').removeClass('activekey');
        $('#key5').removeClass('whiteactivekey');

    });

    $("#key6").on('mousedown', function () {
        synth.triggerAttack('F3');
        startMouseDownTime[5] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');


        if (recording === true) {
            timeStampArray[5].push(getCurrentTime())
        }

    });

    $("#key6").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[5].push(getMouseDownTime(5));
            }
        }
        $('#key6').removeClass('activekey');
        $('#key6').removeClass('whiteactivekey');
    });

    $("#key6").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[5].push(getMouseDownTime(5));
            }
        }
        $('#key6').removeClass('activekey');
        $('#key6').removeClass('whiteactivekey');

    });

    $("#key7").on('mousedown', function () {
        synth.triggerAttack('F#3');
        startMouseDownTime[6] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');


        if (recording === true) {
            timeStampArray[6].push(getCurrentTime())
        }

    });

    $("#key7").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[6].push(getMouseDownTime(6));
            }
        }
        $('#key7').removeClass('activekey');
        $('#key7').removeClass('blackactivekey');
    });

    $("#key7").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[6].push(getMouseDownTime(6));
            }
        }
        $('#key7').removeClass('activekey');
        $('#key7').removeClass('blackactivekey');

    });

    $("#key8").on('mousedown', function () {
        synth.triggerAttack('G3');
        startMouseDownTime[7] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[7].push(getCurrentTime())
        }

    });

    $("#key8").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[7].push(getMouseDownTime(7));
            }
        }
        $('#key8').removeClass('activekey');
        $('#key8').removeClass('whiteactivekey');

    });

    $("#key8").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[7].push(getMouseDownTime(7));
            }
        }
        $('#key8').removeClass('activekey');
        $('#key8').removeClass('whiteactivekey');

    });

    $("#key9").on('mousedown', function () {
        synth.triggerAttack('G#3');
        startMouseDownTime[8] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');


        if (recording === true) {
            timeStampArray[8].push(getCurrentTime())
        }

    });

    $("#key9").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[8].push(getMouseDownTime(8));
            }
        }
        $('#key9').removeClass('activekey');
        $('#key9').removeClass('blackactivekey');
    });

    $("#key9").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[8].push(getMouseDownTime(8));
            }
        }
        $('#key9').removeClass('activekey');
        $('#key9').removeClass('blackactivekey');

    });

    $("#key10").on('mousedown', function () {
        synth.triggerAttack('A3');
        startMouseDownTime[9] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[9].push(getCurrentTime())
        }

    });

    $("#key10").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[9].push(getMouseDownTime(9));
            }
        }
        $('#key10').removeClass('activekey');
        $('#key10').removeClass('whiteactivekey');

    });

    $("#key10").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[9].push(getMouseDownTime(9));
            }
        }
        $('#key10').removeClass('activekey');
        $('#key10').removeClass('whiteactivekey');


    });

    $("#key11").on('mousedown', function () {
        synth.triggerAttack('A#3');
        startMouseDownTime[10] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[10].push(getCurrentTime())
        }

    });

    $("#key11").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[10].push(getMouseDownTime(10));
            }
        }
        $('#key11').removeClass('activekey');
        $('#key11').removeClass('blackactivekey');
    });

    $("#key11").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[10].push(getMouseDownTime(10));
            }
        }
        $('#key11').removeClass('activekey');
        $('#key11').removeClass('blackactivekey');


    });

    $("#key12").on('mousedown', function () {
        synth.triggerAttack('B3');
        startMouseDownTime[11] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[11].push(getCurrentTime())
        }

    });

    $("#key12").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[11].push(getMouseDownTime(11));
            }
        }
        $('#key12').removeClass('activekey');
        $('#key12').removeClass('whiteactivekey');

    });

    $("#key12").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[11].push(getMouseDownTime(11));
            }
        }
        $('#key12').removeClass('activekey');
        $('#key12').removeClass('whiteactivekey');

    });

    $("#key13").on('mousedown', function () {
        synth.triggerAttack('C4');
        startMouseDownTime[12] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[12].push(getCurrentTime())
        }
    });

    $("#key13").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[12].push(getMouseDownTime(12));
            }
        }
        $('#key13').removeClass('activekey');
        $('#key13').removeClass('whiteactivekey');

    });

    $("#key13").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[12].push(getMouseDownTime(12));
            }
        }
        $('#key13').removeClass('activekey');
        $('#key13').removeClass('whiteactivekey');

    });

    $("#key14").on('mousedown', function () {
        synth.triggerAttack('C#4');
        startMouseDownTime[13] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[13].push(getCurrentTime())
        }

    });

    $("#key14").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[13].push(getMouseDownTime(13));
            }
        }
        $('#key14').removeClass('activekey');
        $('#key14').removeClass('blackactivekey');
    });

    $("#key14").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[13].push(getMouseDownTime(13));
            }
        }
        $('#key14').removeClass('activekey');
        $('#key14').removeClass('blackactivekey');


    });

    $("#key15").on('mousedown', function () {
        synth.triggerAttack('D4');
        startMouseDownTime[14] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[14].push(getCurrentTime())
        }
    });

    $("#key15").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[14].push(getMouseDownTime(14));
            }
        }
        $('#key15').removeClass('activekey');
        $('#key15').removeClass('whiteactivekey');
    });

    $("#key15").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[14].push(getMouseDownTime(14));
            }
        }
        $('#key15').removeClass('activekey');
        $('#key15').removeClass('whiteactivekey');

    });

    $("#key16").on('mousedown', function () {
        synth.triggerAttack('D#4');
        startMouseDownTime[15] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[15].push(getCurrentTime())
        }

    });

    $("#key16").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[15].push(getMouseDownTime(15));
            }
        }
        $('#key16').removeClass('activekey');
        $('#key16').removeClass('blackactivekey');
    });

    $("#key16").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[15].push(getMouseDownTime(15));
            }
        }
        $('#key16').removeClass('activekey');
        $('#key16').removeClass('blackactivekey');

    });

    $("#key17").on('mousedown', function () {
        synth.triggerAttack('E4');
        startMouseDownTime[16] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[16].push(getCurrentTime())
        }

    });

    $("#key17").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[16].push(getMouseDownTime(16));
            }
        }
        $('#key17').removeClass('activekey');
        $('#key17').removeClass('whiteactivekey');
    });

    $("#key17").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[16].push(getMouseDownTime(16));
            }
        }
        $('#key17').removeClass('activekey');
        $('#key17').removeClass('whiteactivekey');

    });

    $("#key18").on('mousedown', function () {
        synth.triggerAttack('F4');
        startMouseDownTime[17] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[17].push(getCurrentTime())
        }

    });

    $("#key18").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[17].push(getMouseDownTime(17));
            }
        }
        $('#key18').removeClass('activekey');
        $('#key18').removeClass('whiteactivekey');
    });

    $("#key18").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[17].push(getMouseDownTime(17));
            }
        }
        $('#key18').removeClass('activekey');
        $('#key18').removeClass('whiteactivekey');

    });

    $("#key19").on('mousedown', function () {
        synth.triggerAttack('F#4');
        startMouseDownTime[18] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[18].push(getCurrentTime())
        }

    });

    $("#key19").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[18].push(getMouseDownTime(18));
            }
        }
        $('#key19').removeClass('activekey');
        $('#key19').removeClass('blackactivekey');
    });

    $("#key19").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[18].push(getMouseDownTime(18));
            }
        }
        $('#key19').removeClass('activekey');
        $('#key19').removeClass('blackactivekey');

    });

    $("#key20").on('mousedown', function () {
        synth.triggerAttack('G4');
        startMouseDownTime[19] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[19].push(getCurrentTime())
        }

    });

    $("#key20").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[19].push(getMouseDownTime(19));
            }
        }
        $('#key20').removeClass('activekey');
        $('#key20').removeClass('whiteactivekey');
    });

    $("#key20").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[19].push(getMouseDownTime(19));
            }
        }
        $('#key20').removeClass('activekey');
        $('#key20').removeClass('whiteactivekey');

    });

    $("#key21").on('mousedown', function () {
        synth.triggerAttack('G#4');
        startMouseDownTime[20] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[20].push(getCurrentTime())
        }

    });

    $("#key21").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[20].push(getMouseDownTime(20));
            }
        }
        $('#key21').removeClass('activekey');
        $('#key21').removeClass('blackactivekey');
    });

    $("#key21").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[20].push(getMouseDownTime(20));
            }
        }
        $('#key21').removeClass('activekey');
        $('#key21').removeClass('blackactivekey');

    });

    $("#key22").on('mousedown', function () {
        synth.triggerAttack('A4');
        startMouseDownTime[21] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[21].push(getCurrentTime())
        }

    });

    $("#key22").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[21].push(getMouseDownTime(21));
            }
        }
        $('#key22').removeClass('activekey');
        $('#key22').removeClass('whiteactivekey');
    });

    $("#key22").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[21].push(getMouseDownTime(21));
            }
        }
        $('#key22').removeClass('activekey');
        $('#key22').removeClass('whiteactivekey');

    });

    $("#key23").on('mousedown', function () {
        synth.triggerAttack('A#4');
        startMouseDownTime[22] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[22].push(getCurrentTime())
        }

    });

    $("#key23").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[22].push(getMouseDownTime(22));
            }
        }
        $('#key23').removeClass('activekey');
        $('#key23').removeClass('blackactivekey');
    });

    $("#key23").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[22].push(getMouseDownTime(22));
            }
        }
        $('#key23').removeClass('activekey');
        $('#key23').removeClass('blackactivekey');

    });

    $("#key24").on('mousedown', function () {
        synth.triggerAttack('B4');
        startMouseDownTime[23] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[23].push(getCurrentTime())
        }

    });

    $("#key24").on('mouseup', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[23].push(getMouseDownTime(23));
            }
        }
        $('#key24').removeClass('activekey');
        $('#key24').removeClass('whiteactivekey');
    });

    $("#key24").on('mouseout', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[23].push(getMouseDownTime(23));
            }
        }
        $('#key24').removeClass('activekey');
        $('#key24').removeClass('blackactivekey');

    });

} else {
    $("#key1").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('C3');
        startMouseDownTime[0] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[0].push(getCurrentTime())
        }

    });

    $("#key1").on('touchend', function () {
        synth.triggerRelease();
        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[0].push(getMouseDownTime(0));
            }
        }
        $('#key1').removeClass('activekey');
        $('#key1').removeClass('whiteactivekey');

    });

    $("#key2").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('C#3');
        startMouseDownTime[1] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');


        if (recording === true) {
            timeStampArray[1].push(getCurrentTime())
        }
    });

    $("#key2").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[1].push(getMouseDownTime(1));
            }
        }
        $('#key2').removeClass('activekey');
        $('#key2').removeClass('blackactivekey');


    });

    $("#key3").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('D3');
        startMouseDownTime[2] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[2].push(getCurrentTime())
        }

    });

    $("#key3").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[2].push(getMouseDownTime(2));
            }
        }
        $('#key3').removeClass('activekey');
        $('#key3').removeClass('whiteactivekey');

    });

    $("#key4").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('D#3');
        startMouseDownTime[3] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[3].push(getCurrentTime())
        }

    });

    $("#key4").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[3].push(getMouseDownTime(3));
            }
        }
        $('#key4').removeClass('activekey');
        $('#key4').removeClass('blackactivekey');
    });

    $("#key5").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('E3');
        startMouseDownTime[4] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[4].push(getCurrentTime())
        }

    });

    $("#key5").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[4].push(getMouseDownTime(4));
            }
        }
        $('#key5').removeClass('activekey');
        $('#key5').removeClass('whiteactivekey');
    });

    $("#key6").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('F3');
        startMouseDownTime[5] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');


        if (recording === true) {
            timeStampArray[5].push(getCurrentTime())
        }

    });

    $("#key6").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[5].push(getMouseDownTime(5));
            }
        }
        $('#key6').removeClass('activekey');
        $('#key6').removeClass('whiteactivekey');
    });

    $("#key7").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('F#3');
        startMouseDownTime[6] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');


        if (recording === true) {
            timeStampArray[6].push(getCurrentTime())
        }

    });

    $("#key7").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[6].push(getMouseDownTime(6));
            }
        }
        $('#key7').removeClass('activekey');
        $('#key7').removeClass('blackactivekey');
    });

    $("#key8").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('G3');
        startMouseDownTime[7] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[7].push(getCurrentTime())
        }

    });

    $("#key8").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[7].push(getMouseDownTime(7));
            }
        }
        $('#key8').removeClass('activekey');
        $('#key8').removeClass('whiteactivekey');

    });

    $("#key9").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('G#3');
        startMouseDownTime[8] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');


        if (recording === true) {
            timeStampArray[8].push(getCurrentTime())
        }

    });

    $("#key9").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[8].push(getMouseDownTime(8));
            }
        }
        $('#key9').removeClass('activekey');
        $('#key9').removeClass('blackactivekey');
    });

    $("#key10").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('A3');
        startMouseDownTime[9] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[9].push(getCurrentTime())
        }

    });

    $("#key10").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[9].push(getMouseDownTime(9));
            }
        }
        $('#key10').removeClass('activekey');
        $('#key10').removeClass('whiteactivekey');

    });

    $("#key11").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('A#3');
        startMouseDownTime[10] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[10].push(getCurrentTime())
        }

    });

    $("#key11").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[10].push(getMouseDownTime(10));
            }
        }
        $('#key11').removeClass('activekey');
        $('#key11').removeClass('blackactivekey');
    });

    $("#key12").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('B3');
        startMouseDownTime[11] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[11].push(getCurrentTime())
        }

    });

    $("#key12").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[11].push(getMouseDownTime(11));
            }
        }
        $('#key12').removeClass('activekey');
        $('#key12').removeClass('whiteactivekey');

    });

    $("#key13").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('C4');
        startMouseDownTime[12] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[12].push(getCurrentTime())
        }
    });

    $("#key13").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[12].push(getMouseDownTime(12));
            }
        }
        $('#key13').removeClass('activekey');
        $('#key13').removeClass('whiteactivekey');

    });

    $("#key14").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('C#4');
        startMouseDownTime[13] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[13].push(getCurrentTime())
        }

    });

    $("#key14").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[13].push(getMouseDownTime(13));
            }
        }
        $('#key14').removeClass('activekey');
        $('#key14').removeClass('blackactivekey');
    });

    $("#key15").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('D4');
        startMouseDownTime[14] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[14].push(getCurrentTime())
        }
    });

    $("#key15").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[14].push(getMouseDownTime(14));
            }
        }
        $('#key15').removeClass('activekey');
        $('#key15').removeClass('whiteactivekey');
    });

    $("#key16").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('D#4');
        startMouseDownTime[15] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[15].push(getCurrentTime())
        }

    });

    $("#key16").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[15].push(getMouseDownTime(15));
            }
        }
        $('#key16').removeClass('activekey');
        $('#key16').removeClass('blackactivekey');
    });

    $("#key17").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('E4');
        startMouseDownTime[16] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[16].push(getCurrentTime())
        }

    });

    $("#key17").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[16].push(getMouseDownTime(16));
            }
        }
        $('#key17').removeClass('activekey');
        $('#key17').removeClass('whiteactivekey');
    });

    $("#key18").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('F4');
        startMouseDownTime[17] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[17].push(getCurrentTime())
        }

    });

    $("#key18").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[17].push(getMouseDownTime(17));
            }
        }
        $('#key18').removeClass('activekey');
        $('#key18').removeClass('whiteactivekey');
    });

    $("#key19").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('F#4');
        startMouseDownTime[18] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[18].push(getCurrentTime())
        }

    });

    $("#key19").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[18].push(getMouseDownTime(18));
            }
        }
        $('#key19').removeClass('activekey');
        $('#key19').removeClass('blackactivekey');
    });

    $("#key20").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('G4');
        startMouseDownTime[19] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[19].push(getCurrentTime())
        }

    });

    $("#key20").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[19].push(getMouseDownTime(19));
            }
        }
        $('#key20').removeClass('activekey');
        $('#key20').removeClass('whiteactivekey');
    });

    $("#key21").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('G#4');
        startMouseDownTime[20] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[20].push(getCurrentTime())
        }

    });

    $("#key21").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[20].push(getMouseDownTime(20));
            }
        }
        $('#key21').removeClass('activekey');
        $('#key21').removeClass('blackactivekey');
    });

    $("#key22").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('A4');
        startMouseDownTime[21] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[21].push(getCurrentTime())
        }

    });

    $("#key22").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[21].push(getMouseDownTime(21));
            }
        }
        $('#key22').removeClass('activekey');
        $('#key22').removeClass('whiteactivekey');
    });

    $("#key23").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('A#4');
        startMouseDownTime[22] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('blackactivekey');

        if (recording === true) {
            timeStampArray[22].push(getCurrentTime())
        }

    });

    $("#key23").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[22].push(getMouseDownTime(22));
            }
        }
        $('#key23').removeClass('activekey');
        $('#key23').removeClass('blackactivekey');
    });

    $("#key24").on('touchstart', function (e) {
        e.preventDefault();
        synth.triggerAttack('B4');
        startMouseDownTime[23] = Date.now();
        $(this).addClass('activekey');
        $(this).addClass('whiteactivekey');

        if (recording === true) {
            timeStampArray[23].push(getCurrentTime())
        }

    });

    $("#key24").on('touchend', function () {
        synth.triggerRelease();

        if ($(this).hasClass('activekey')) {
            if (recording === true) {
                timingLengthsArray[23].push(getMouseDownTime(23));
            }
        }
        $('#key24').removeClass('activekey');
        $('#key24').removeClass('whiteactivekey');
    });
}

$('#recButton').addClass("notRec");

$('#recButton').click(function(){

    if($('#recButton').hasClass('notRec')){
        $('#recButton').html($('#recButton').html().replace('  Record','  Stop'));
        $('#recButton').removeClass("notRecColor");
        $('#recButton').addClass("RecColor");
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
        $('#recButton').html($('#recButton').html().replace('  Stop','  Record'));
        $('#recButton').removeClass("RecColor");
        $('#recButton').addClass("notRecColor");
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
        if(songString !== "||"){
            $('.playOnRecord').prop('disabled', false);
            $('.saveOnRecord').attr('disabled', false);
        }
        $("#songHash").val(songString);
    }
});


$(document).on('click', '#playButton', function(){
    Tone.Transport.clear();
    Tone.Transport.stop();
    Tone.Transport.start();

    playNotes(instrumentTypes[0],.8,songInputs[0],songInputs[1],songInputs[2]);
});

$(document).on('click', '#save-modal', function(){
    let songString = songPacking(songInputs[0],songInputs[1],songInputs[2]);
    console.log(songString);
    $("#songHash").val(songString);
});

$('#save-modal').focusin(function() {
    onKeyDown(null);
    onKeyUp(null);
});

$('#save-modal').focusout(function() {
    const synth = new Tone.PolySynth( 10 );
    synth.toMaster();

    onKeyDown(synth);
    onKeyUp(synth);
});

