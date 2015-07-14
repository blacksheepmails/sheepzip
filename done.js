function main() {
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
    var sound = document.getElementById('audio');
    document.getElementById('audio-source').src = 'audio/' + localStorage.language + '/32.mp3';
    sound.load();
    sound.play();
    document.getElementById("submit").addEventListener("click", clickHandler);
}
