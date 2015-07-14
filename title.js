function main() {
	document.getElementById('welsh-audio').onended = function () {
		document.getElementById('english-audio').play();
	}
}

function next() {
	window.location.href="language.html";
}
