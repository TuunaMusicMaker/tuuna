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

$('#key2').mousedown(function() {
    synth.triggerAttack('C#3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('C#3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key2').mouseup(function() {
    synth.triggerRelease();
    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key2').removeClass('activekey');

});

$('#key2').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key2').removeClass('activekey');

});

$('#key3').mousedown(function() {
    synth.triggerAttack('D3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('D3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key3').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key3').removeClass('activekey');

});

$('#key3').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key3').removeClass('activekey');

});

$('#key4').mousedown(function() {
    synth.triggerAttack('D#3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('D#3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key4').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key4').removeClass('activekey');

});

$('#key4').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key4').removeClass('activekey');

});

$('#key5').mousedown(function() {
    synth.triggerAttack('E3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('E3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key5').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key5').removeClass('activekey');

});

$('#key5').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key5').removeClass('activekey');

});

$('#key6').mousedown(function() {
    synth.triggerAttack('F3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('F3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key6').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key6').removeClass('activekey');

});

$('#key6').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key6').removeClass('activekey');

});

$('#key7').mousedown(function() {
    synth.triggerAttack('F#3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('F#3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key7').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key7').removeClass('activekey');

});

$('#key7').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key7').removeClass('activekey');

});

$('#key8').mousedown(function() {
    synth.triggerAttack('G3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('G3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key8').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key8').removeClass('activekey');

});

$('#key8').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key8').removeClass('activekey');

});

$('#key9').mousedown(function() {
    synth.triggerAttack('G#3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('G#3');
        timeStampArray.push(getCurrentTime());
    }
});

$('#key9').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key9').removeClass('activekey');

});

$('#key9').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key9').removeClass('activekey');

});

$('#key10').mousedown(function() {
    synth.triggerAttack('A3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('A3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key10').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key10').removeClass('activekey');

});

$('#key10').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key10').removeClass('activekey');

});

$('#key11').mousedown(function() {
    synth.triggerAttack('A#3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('A#3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key11').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key11').removeClass('activekey');

});

$('#key11').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key11').removeClass('activekey');

});

$('#key12').mousedown(function() {
    synth.triggerAttack('B3');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('B3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key12').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key12').removeClass('activekey');

});

$('#key12').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key12').removeClass('activekey');

});

$('#key13').mousedown(function() {
    synth.triggerAttack('C4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('C4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key13').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key13').removeClass('activekey');

});

$('#key13').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key13').removeClass('activekey');

});

$('#key14').mousedown(function() {
    synth.triggerAttack('C#4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('C#4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key14').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key14').removeClass('activekey');

});

$('#key14').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key14').removeClass('activekey');

});

$('#key15').mousedown(function() {
    synth.triggerAttack('D4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('D4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key15').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key15').removeClass('activekey');

});

$('#key15').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key15').removeClass('activekey');

});

$('#key16').mousedown(function() {
    synth.triggerAttack('D#4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('D#4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key16').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key16').removeClass('activekey');

});

$('#key16').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key16').removeClass('activekey');

});

$('#key17').mousedown(function() {
    synth.triggerAttack('E4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('E4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key17').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key17').removeClass('activekey');

});

$('#key17').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key17').removeClass('activekey');

});

$('#key18').mousedown(function() {
    synth.triggerAttack('F4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('F4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key18').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key18').removeClass('activekey');

});

$('#key18').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key18').removeClass('activekey');

});

$('#key19').mousedown(function() {
    synth.triggerAttack('F#4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('F#4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key19').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key19').removeClass('activekey');

});

$('#key19').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key19').removeClass('activekey');

});

$('#key20').mousedown(function() {
    synth.triggerAttack('G4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('G4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key20').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key20').removeClass('activekey');

});

$('#key20').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key20').removeClass('activekey');

});

$('#key21').mousedown(function() {
    synth.triggerAttack('G#4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('G#4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key21').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key21').removeClass('activekey');

});

$('#key21').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key21').removeClass('activekey');

});

$('#key22').mousedown(function() {
    synth.triggerAttack('A4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('A4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key22').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key22').removeClass('activekey');

});

$('#key22').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key22').removeClass('activekey');

});

$('#key23').mousedown(function() {
    synth.triggerAttack('A#4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('A#4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key23').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key23').removeClass('activekey');

});

$('#key23').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key23').removeClass('activekey');

});

$('#key24').mousedown(function() {
    synth.triggerAttack('B4');
    startMouseDownTime = Date.now();
    $(this).addClass('activekey');

    if (recording === true) {
        notesArray.push('B4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key24').mouseup(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key24').removeClass('activekey');

});

$('#key24').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }
    $('#key24').removeClass('activekey');

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