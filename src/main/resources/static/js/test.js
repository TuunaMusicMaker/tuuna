let synth = new Tone.Synth();
let start;
let startDownTime;
let notesArray = [];
let lengthsArray = [];
let timingArray = [];
let reRecording = 0;
let recording = false;
synth.toMaster();

function getCurrentTime() {
    if (start !== null) {
        let delta = Date.now() - start;
        return delta + "";
    }

}

$('#key1').mousedown(function() {
    synth.triggerAttack('A4');
    //start timer function

});

$('#key1').mouseup(function() {
    synth.triggerRelease();
    //end timer

});

$('#key1').mouseout(function() {
    synth.triggerRelease();
    //end timer

});


// $('#key1').click(function(){
//     synth.triggerAttackRelease('A4', '8n');
//     console.log(getCurrentTime());
//
//     if (recording === true) {
//         notesArray.push('A4');
//         lengthsArray.push('8n');
//         timingArray.push(getCurrentTime());
//     }
//     // if (recording = true) {
//     //     song[0] = synth.triggerAttackRelease('A4', '8n', parseIntconsole.timeEnd());
//     // console.time()
//     // }
//
//

// });

$('#key2').click(function(){
    synth.triggerAttackRelease('B4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('B4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});


$('#key3').click(function(){
    synth.triggerAttackRelease('C4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('C4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});


$('#key4').click(function(){
    synth.triggerAttackRelease('D4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('D4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }
});

$('#key5').click(function(){
    synth.triggerAttackRelease('E4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('E4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});


$('#key6').click(function(){
    synth.triggerAttackRelease('F4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('F4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});

$('#key7').click(function(){
    synth.triggerAttackRelease('G4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('G4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});

$('#recButton').addClass("notRec");

$('#recButton').click(function(){

    if($('#recButton').hasClass('notRec')){
        $('#recButton').removeClass("notRec");
        $('#recButton').addClass("Rec");
        if (reRecording === 1) {
            notesArray = [];
            lengthsArray = [];
            timingArray = [];
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

$('#playButton').click(function(){

    console.log(notesArray);
    console.log(lengthsArray);
    console.log(timingArray);
});