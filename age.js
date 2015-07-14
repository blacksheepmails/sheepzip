function main() {
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
    var sound = document.getElementById('audio');
    document.getElementById('audio-source').src = 'audio/' + localStorage.language + '/5.mp3';
    sound.load();
    sound.play();
}

function clickHandler (age) {
	localStorage.age=age;
	window.location.href="gender.html";
}
