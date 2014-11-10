var globaldata;


function getCourses(){
	$.get( "../server/main2.php/userCourses", function( data ) {
		console.log(data);
		// callback(data);
		//load courses into table
		var courseArray = JSON.parse(data);
		for (var i = 0; i < courseArray.length; i++) {
			addCourseToTable(courseArray[i]);
		}
	});

}

function getLogin(){
	$.get("../server/main2.php/user", function(data){
		console.log("user: ");
		console.log(data);
	});
}

function addCourseToYear(yearNumber, courseName){
	var yearObject = $( $(".year")[yearNumber-1] );

	var courseObject = dom("div", {class:"course"}, document.createTextNode(courseName));

	yearObject.append(courseObject);

}

function addCourseToTable(course){
	var courseElem = dom("div", {class:"course"}, document.createTextNode(course.course));
	var term = course.term.toLowerCase();
	var tableCell = document.getElementById("sem-" + term);
	tableCell.appendChild(courseElem);
}



window.onload=function(){
	console.log("loaded");
	getCourses();
};

function canTakeCourse(course){
	var couseObj = courseMap(course);
	if(couseObj.yearStatus !== undefined){
		if(couseObj.yearStatus < getUserYearStatus()){
			return false;
		}
	}
	//for each group of required courses check if student has taken at least one
	couseObj.courses.forEach(function (elem){
		var takenGroupPrereq = false;
		for(var i  = 0 ; i < elem.length ; i++){
			if(hasTaken(elem[i])){
				takenGroupPrereq = true;
			}
		}
		if(takenGroupPrereq !== true){
			return false;
		}
	});
	
	return true;
}

function getUserYearStatus(){
	return 4;
}

function hasTaken(){

}