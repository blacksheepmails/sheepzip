function main () {
        if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
    document.getElementById("boy_img").addEventListener("click", clickHandler.bind(this, "boy"));
    document.getElementById("boy_txt").addEventListener("click", clickHandler.bind(this, "boy"));
    document.getElementById("girl_img").addEventListener("click", clickHandler.bind(this, "girl"));
    document.getElementById("girl_txt").addEventListener("click", clickHandler.bind(this, "girl"));
}

function clickHandler (gender) {
	localStorage.gender=gender;
	window.location.href="this-is-zip.html";
}
