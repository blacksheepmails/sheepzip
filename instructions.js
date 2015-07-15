var user = {
		'name' : localStorage.name,
		'language' : localStorage.language,
		'age' : localStorage.age,
		'gender' : localStorage.gender
	};

	$.ajax({
		type: "POST",
		url: "/api/user",
		data: JSON.stringify(user),
		dataType: "json",
		contentType: "application/json",
		success: function (data){localStorage.id=data.id;}
	});

function main() {
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
    var sound = document.getElementById('audio');
    document.getElementById('audio-source').src = 'audio/' + localStorage.language + '/7.mp3';
    sound.load();
    sound.play();
    document.getElementById("submit").addEventListener("click", clickHandler);
}

function next() {
	window.location.href="questions.html";
}
