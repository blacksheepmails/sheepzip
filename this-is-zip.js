function main() {
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
}

function next() {
	window.location.href="age.html";
}
