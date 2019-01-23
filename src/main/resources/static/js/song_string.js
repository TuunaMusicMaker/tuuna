(function($) {
    const request = $.ajax({'url': 'songs/' + ${id} + '/song.json'});
    request.done(function (songHash) {
        let html = '';
            html += '<p>' + songHash + '</p>';
        $('#songHash').html(html);
    });
})(jQuery);