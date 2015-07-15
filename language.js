
function main () {
	/*document.getElementById('welsh-audio').play();
	document.getElementById('welsh-audio').onended = function () {
		document.getElementById('english-audio').play();
	}*/

    document.getElementById("welsh").addEventListener("click", clickHandler.bind(this, "welsh"));
    document.getElementById("english").addEventListener("click", clickHandler.bind(this, "english"));
}

function clickHandler (language) {
	localStorage.language=language;
	window.location.href="name.html";
}
