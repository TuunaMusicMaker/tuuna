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


// $('#key1').click(function(){
//     synth.triggerAttackRelease('A4', '8n');
//     console.log(getCurrentTime());
//
//     if (recording === true) {
//         notesArray.push('A4');
//         lengthsArray.push('8n');
//         timeStampArray.push(getCurrentTime());
//     }
//     // if (recording = true) {
//     //     song[0] = synth.triggerAttackRelease('A4', '8n', parseIntconsole.timeEnd());
//     // console.time()
//     // }
//
//

// });


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
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
        $('#key1').removeClass('activekey');
    }

});

$('#key1').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }


});

$('#key2').mousedown(function() {
    synth.triggerAttack('D3');
    startMouseDownTime = Date.now();

    if (recording === true) {
        notesArray.push('D3');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key2').mouseup(function() {
    synth.triggerRelease();

    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }
    startMouseDownTime = null;
});

$('#key2').mouseout(function() {
    synth.triggerRelease();

    if($(this).hasClass('activekey')) {
        if (recording === true) {
            timingLengthsArray.push(getMouseDownTime());
        }
    }


});


$('#key3').mousedown(function() {
    synth.triggerAttack('C4');
    startMouseDownTime = Date.now();

    if (recording === true) {
        notesArray.push('C4');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key3').mouseup(function() {
    synth.triggerRelease();
    console.log(getMouseDownTime());

    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }
    startMouseDownTime = null;
});

$('#key3').mouseout(function() {
    synth.triggerRelease();
    console.log(getMouseDownTime());

    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }
    startMouseDownTime = null;

});


$('#key4').mousedown(function() {
    synth.triggerAttack('D4');
    startMouseDownTime = Date.now();

    if (recording === true) {
        notesArray.push('D4');
        // timingLengthsArray.push('8n');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key4').mouseup(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;
});

$('#key4').mouseout(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;

});


$('#key5').mousedown(function() {
    synth.triggerAttack('E4');
    startMouseDownTime = Date.now();

    if (recording === true) {
        notesArray.push('E4');
        // timingLengthsArray.push('8n');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key5').mouseup(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;
});

$('#key5').mouseout(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;

});


$('#key6').mousedown(function() {
    synth.triggerAttack('F4');
    startMouseDownTime = Date.now();

    if (recording === true) {
        notesArray.push('F4');
        // timingLengthsArray.push('8n');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key6').mouseup(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;
});

$('#key6').mouseout(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;

});


$('#key7').mousedown(function() {
    synth.triggerAttack('G4');
    startMouseDownTime = Date.now();

    if (recording === true) {
        notesArray.push('G4');
        // timingLengthsArray.push('8n');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key7').mouseup(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;
});

$('#key7').mouseout(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;

});


$('#key8').mousedown(function() {
    synth.triggerAttack('A5');
    startMouseDownTime = Date.now();

    if (recording === true) {
        notesArray.push('A5');
        // timingLengthsArray.push('8n');
        timeStampArray.push(getCurrentTime());
    }

});

$('#key8').mouseup(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }

    startMouseDownTime = null;
});

$('#key8').mouseout(function() {
    synth.triggerRelease();
    if (recording === true) {
        timingLengthsArray.push(getMouseDownTime());
    }
    startMouseDownTime = null;

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

//     console.log(Tone.Time(2.7).toNotation());                                                 //convert seconds into 2n,4n,or 8n (bpm defined on Tone)
// console.log(Tone.Time('2n').toSeconds());                                                //convert 2n,4n,or 8n into seconds
// console.log(Tone.Time(2.2).toBarsBeatsSixteenths());                                     //convert seconds into 0:0:0 (bars:Beats:sixteenths)
// console.log(Tone.Time('4n').toBarsBeatsSixteenths());                                    //convert 2n,4n,or 8n into 0:0:0 (bars:Beats:sixteenths)
    Tone.Transport.clear();
    Tone.Transport.stop();

    Tone.Transport.start();
    playNotes(instrumentTypes[0],.8,notesArray,convertedLengthArray,convertedTimeStampArray);

    console.log(notesArray);
    console.log(msToBars(timingLengthsArray));

    console.log(msToBars(timeStampArray));
    console.log(timeStampArray);

});