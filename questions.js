var question_counter = 0;
var solution_counter = 0;
var questions;

function main () {
    $("#content-question-container").hide();
    $(".solution-container").hide();
    if (localStorage.language == 'english') {
        $('.welsh').hide();
    } else {
        $('.english').hide();
    }
    $.get("/api/questions", function (data,status) {
	    if (status=="success") {
		    questions=data.questions;
            document.getElementById('start').addEventListener("click", function() {
                $('#start').hide();
		        loadQuestion();
            });
	    }
    });

    function attachEventListener(response) {
        document.getElementById(response).addEventListener("click", function() {
	        recordResponse(response);
	        next();
	        }
        );
    }
    
    attachEventListener("negative");
    attachEventListener("neutral");
    attachEventListener("positive");    

    document.getElementById("content-question-container").addEventListener("click", loadSolution);

}
function loadSolution () {
    $(".content-question-container").hide();
    $(".solution-container").show();
    var imgtxt;
    var imgsrc;
    if (localStorage.language == 'english') {
        imgtxt = questions[question_counter].solutions[solution_counter].english_text;
    } else {
        imgtxt = questions[question_counter].solutions[solution_counter].welsh_text;
    }
    if (questions[question_counter].solutions[solution_counter].image_duo == 'true') {
        imgsrc = "social-problem-solving/static/assets/img-new/" + localStorage.language + '_' + questions[question_counter].solutions[solution_counter].image;
    } else {
        imgsrc = "social-problem-solving/static/assets/img-new/" + questions[question_counter].solutions[solution_counter].image;
    }
    document.getElementById("solution-txt").innerHTML = imgtxt; 
    document.getElementById("solution-img").innerHTML = "<img class=\"content\" src=\"" + imgsrc + "\"></img>";

    var sound = document.getElementById('audio');
    document.getElementById('audio-source').src = 'audio/' + localStorage.language + '/' + questions[question_counter].solutions[solution_counter].sound;
    sound.load();
    sound.play();
    document.getElementById('audio').onended = function () {
        document.getElementById('audio-instructions-source').src = 'audio/' + localStorage.language + '/33.mp3';
        document.getElementById('audio-instructions').load();
        document.getElementById('audio-instructions').play();
    }
}

function loadQuestion () {
    $(".solution-container").hide();
    $(".content-question-container").show();
    var imgtxt;
    if (localStorage.language == 'english') {
        imgtxt = questions[question_counter].english_text;
    } else {
        imgtxt = questions[question_counter].welsh_text;
    }

    var imgsrc = "social-problem-solving/static/assets/img-new/" + questions[question_counter].image;
    document.getElementById("question-txt").innerHTML = imgtxt; 
    document.getElementById("question-img").innerHTML = "<img class=\"content\" src=\"" + imgsrc + "\"></img>";

    var sound = document.getElementById('audio');
    document.getElementById('audio-source').src = 'audio/' + localStorage.language + '/' + questions[question_counter].sound;
    sound.load();
    sound.play();
}

function recordResponse (response) {
	var sid = questions[question_counter].solutions[solution_counter].solution_id;
    var qid = questions[question_counter].question_id;
	var response = {response: response, question_id: qid, solution_id: sid, user_id: localStorage.id};
	$.ajax({
		method: "POST",
		url: "/api/response",
		data: JSON.stringify(response),
		dataType: "json",
		contentType: "application/json",
	});
}

function next() {
    document.getElementById('audio').pause();
    document.getElementById('audio-instructions').pause();

	if (solution_counter >= Object.keys(questions[question_counter].solutions).length - 1) {
        if (question_counter >= Object.keys(questions).length - 1) {
	        window.location.href="done.html";
        } else {
		    solution_counter = 0;
		    question_counter = question_counter + 1;
		    loadQuestion();
        }
	} else {
        solution_counter = solution_counter + 1;
		loadSolution();
	}
}
