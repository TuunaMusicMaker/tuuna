
// calls the RESTful API and shows an empty div with the songHash of the selected song on a blank html page
$(document).on('click', '#playButton', function(){
    const request = $.ajax({'url': 'songs/' + ${id} + '/song.json'});
    request.done(function (songHash) {
        let html = '';
        html += '<p>' + songHash + '</p>';
        $('#songHash').html(html);
    });

});

// calls the RESTful API and saves the songHash variable in the javascript to allow it to be unpacked and played
$(document).on('click', '#playButton', function(){
    const request = $.ajax({'url': 'songs/' + ${id} + '/song.json'});
    request.done(function (songHash) {
        let retrievedSong = songHash;
        // insert unpacking code (and potentially playback code) here
    });

});