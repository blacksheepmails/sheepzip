function main () {
    document.getElementById("submit").addEventListener("click", clickHandler);
}

function clickHandler () {
	var name = document.getElementById("name").value;
	localStorage.name=name;
	window.location.href="this-is-zip.html";
}
