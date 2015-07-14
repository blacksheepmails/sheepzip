function main() {
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }

    var sound = document.getElementById('audio');
    document.getElementById('audio-source').src = 'audio/' + localStorage.language + '/6.mp3';
    sound.load();
    sound.play();
}

function next() {
	window.location.href="instructions.html";
}
