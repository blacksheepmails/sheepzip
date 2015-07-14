function main () {
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
    var sound = document.getElementById('audio');
    document.getElementById('audio-source').src = 'audio/' + localStorage.language + '/3.mp3';
    sound.load();
    sound.play();
    document.getElementById("submit").addEventListener("click", clickHandler);
}

function clickHandler () {
	var name = document.getElementById("name").value;
	localStorage.name=name;
	window.location.href="age.html";
}
