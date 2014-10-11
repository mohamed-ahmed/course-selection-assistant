var globaldata;


function getData(callback){
	$.get( "../server/main2.php/courses", function( data ) {
		console.log(data);
		callback(data);
		globaldata = data;
	});

	put(course)
}

function addCourseToYear(yearNumber, courseName){
	var yearObject = $( $(".year")[yearNumber-1] );

	var courseObject = dom("div", {class:"course"}, document.createTextNode(courseName));

	yearObject.append(courseObject);

}

function callback(value){
	globaldata = value;
}


window.onload=function(){
	console.log("loaded");
	document.getElementById("login-button").onclick = function(){
		hideElement(document.getElementById("signup-form"));
		showElement(document.getElementById("login-form"));
	};

	document.getElementById("signup-button").onclick = function(){
		hideElement(document.getElementById("login-form"));
		showElement(document.getElementById("signup-form"));
	};
};