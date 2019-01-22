var synth = new Tone.Synth();
var song = [];
var recording = false;
synth.toMaster();

function getTime(){
    var delta =
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
    if (recording = true) {
        song[0] = synth.triggerAttackRelease('A4', '8n', parseIntconsole.timeEnd());
    console.time()
    }



});

$('.orange').click(function(){
    synth.triggerAttackRelease('B4', '8n');

});


$('.yellow').click(function(){
    synth.triggerAttackRelease('C4', '8n');

});


$('.green').click(function(){
    synth.triggerAttackRelease('D4', '8n');

});

$('.blue').click(function(){
    synth.triggerAttackRelease('E4', '8n');

});

$('.indigo').click(function(){
    synth.triggerAttackRelease('F4', '8n');

});

$('.violet').click(function(){
    synth.triggerAttackRelease('G 4', '8n');

});

$('#recButton').addClass("notRec");

$('#recButton').click(function(){
    if($('#recButton').hasClass('notRec')){
        $('#recButton').removeClass("notRec");
        $('#recButton').addClass("Rec");
        // recording = true;

         console.time();
        var start = Date.now();

    }
    else{
        $('#recButton').removeClass("Rec");
        $('#recButton').addClass("notRec");
        // recording = false;

        console.count();
    }
});

$('#playButton').click(function(){

});