function main() {
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
}

function clickHandler (age) {
	localStorage.age=age;
	window.location.href="gender.html";
}