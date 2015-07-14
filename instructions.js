var user = {
		'name':localStorage.name,
		'language':localStorage.language,
		'age':localStorage.age,
		'gender':localStorage.gender
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
}

function next() {
	window.location.href="questions.html";
}
