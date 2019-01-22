var synth = new Tone.Synth();
var start;
var notesArray = [];
var lengthsArray = [];
var timingArray = [];
var reRecording = 0;
var recording = false;
synth.toMaster();

function getCurrentTime(){
    if (start !== null) {
        var delta = Date.now() - start;
        return delta + "";
    }

}
$('.key').click(function(){


    $(this).animate({
        height:'20px'
    });

    $(this).animate({
        height:'90px'
    },'fast');


});

$('.red').click(function(){
    synth.triggerAttackRelease('A4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('A4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }
    // if (recording = true) {
    //     song[0] = synth.triggerAttackRelease('A4', '8n', parseIntconsole.timeEnd());
    // console.time()
    // }



});

$('.orange').click(function(){
    synth.triggerAttackRelease('B4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('B4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});


$('.yellow').click(function(){
    synth.triggerAttackRelease('C4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('C4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});


$('.green').click(function(){
    synth.triggerAttackRelease('D4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('D4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }
});

$('.blue').click(function(){
    synth.triggerAttackRelease('E4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('E4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});

$('.indigo').click(function(){
    synth.triggerAttackRelease('F4', '8n');
    console.log(getCurrentTime());

    if (recording === true) {
        notesArray.push('F4');
        lengthsArray.push('8n');
        timingArray.push(getCurrentTime());
    }

});

$('.violet').click(function(){
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