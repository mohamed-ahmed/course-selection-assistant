var globaldata;

var userObject;

var courseOfferingData = {};

function getCourses(){
	$.get( "../server/main2.php/userCourses", function( data ) {
		console.log(data);
		// callback(data);
		//load courses into table
		var courseArray = JSON.parse(data);

		$.get("../server/main2.php/programCourseData", function (programCourseDataResponse){
			console.log("got response");
			var temp = JSON.parse(programCourseDataResponse);
			for(var i in temp){
				courseOfferingData[temp[i].course] = temp[i];
			}
			for (var i = 0; i < courseArray.length; i++) {
				addCourseToTable(courseArray[i]);
			}
		});
	});

}

function getUser(callback){
	$.get("../server/main2.php/user", function(data){
		console.log("user: ");
		console.log(data);
		userObject = JSON.parse(data);
		callback();
	});
}

function addCourseToYear(yearNumber, courseName){
	console.log("in add course to year: " + courseName);
	var yearObject = $( $(".year")[yearNumber-1] );



	var courseObject = dom("div", {class:"course " + courseType}, document.createTextNode(courseName));

	yearObject.append(courseObject);

}

function addCourseToTable(course){
	console.log(course);
	var courseType;
	if(hasTaken(course.course)){
		courseType = "course-completed";
		console.log("blah");
	}
	else if(canTakeCourse(course.course)){
		courseType = "course-can-register";
	}
	else{
		courseType="course-cannot-register";
	}
	var courseElem = dom("div", {class:"course " + courseType}, document.createTextNode(course.course));
	var term = course.term.toLowerCase();
	var tableCell = document.getElementById("sem-" + term);
	tableCell.appendChild(courseElem);
}



window.onload=function(){
	console.log("loaded");
	getUser(getCourses);
};

function canTakeCourse(course){
	if(!courseMap[course]){
		return true;
	}
	console.log(course);
	//todo" remove << courseOfferingData[course] !== undefined >>
	if(courseOfferingData[course] !== undefined ){
		if(courseOfferingData[course].room_cap !== 0 && courseOfferingData[course].students_registered > courseOfferingData[course].room_cap ){
			return false;
		}
	}
	var courseObj = courseMap[course];
	if(courseObj.yearStatus !== undefined){
		if(courseObj.yearStatus > getUserYearStatus()){
			return false;
		}
	}
	//for each group of required courses check if student has taken at least one
	var prereqGroups = courseObj.courses;
	for(var j = 0 ; j < prereqGroups.length ; j++){
		var takenGroupPrereq = false;
		for(var i  = 0 ; i < prereqGroups[j].length ; i++){
			console.log("elem: " + prereqGroups[j]);
			if(hasTaken(prereqGroups[j][i])){
				takenGroupPrereq = true;
			}
		}
		if(takenGroupPrereq === false){
			return false;
		}
	}
	return true;
}

function getUserYearStatus(){
	return 4;
}

function hasTaken(course){
	return userObject.coursesCompleted.indexOf(course) >= 0;
}

function getNextSemester(){
	var month = (new Date()).getMonth();
	var semester;
	switch(true){
		case(month < 4):
			semester = "summer";
			break;
		case(month >=4 && month < 8):
			semester = "fall";
			break;
		case(month >=8 && month < 11):
			semester = "winter";
			break;
		default:
		throw "Invalid month";
	}
	return semester;
}