var question_counter = 0;
var solution_counter = 0;
var questions;

function main () {
    $.get("/questions", function (data,status) {
	    if (status=="success") {
		    questions=data.questions;
		    loadQuestion();
	    }
    });

    function attachEventListner(response) {
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
    var imgtxt = questions[question_counter].solutions[solution_counter].text
    var imgsrc = "social-problem-solving/static/assets/img-new/" + questions[question_counter].solutions[solution_counter].image;
    document.getElementById("solution-txt").innerHTML = imgtxt; 
    document.getElementById("solution-img").innerHTML = "<img class=\"content\" src=\"" + imgsrc + "\"></img>";
}

function loadQuestion () {
    $(".solution-container").hide();
    $(".content-question-container").show();
    var imgtxt = questions[question_counter].text;
    var imgsrc = "social-problem-solving/static/assets/img-new/" + questions[question_counter].image;
    document.getElementById("question-txt").innerHTML = imgtxt; 
    document.getElementById("question-img").innerHTML = "<img class=\"content\" src=\"" + imgsrc + "\"></img>";
}

function recordResponse (response) {
	var sid = questions[question_counter].solutions[solution_counter].solution_id;
    var qid = questions[question_counter].question_id;
	var response = {response: response, question_id: qid, solution_id: sid, user_id: localStorage.id};
	$.ajax({
		method: "POST",
		url: "/response",
		data: JSON.stringify(response),
		dataType: "json",
		contentType: "application/json",
	});
}

function next() {
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
