function main () {
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
    document.getElementById("submit").addEventListener("click", clickHandler);
}

function clickHandler () {
	var name = document.getElementById("name").value;
	localStorage.name=name;
	window.location.href="this-is-zip.html";
}
