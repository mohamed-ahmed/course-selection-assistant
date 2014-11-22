var globaldata;

var userObject;

var courseOfferingData = [];

var programCourses;

function getCourses(){
	$.get( "../server/main2.php/userCourses", function( data ) {
		console.log(data);
		// callback(data);
		//load courses into table
		programCourses = JSON.parse(data);

		$.get("../server/main2.php/programCourseData", function (programCourseDataResponse){
			console.log("got response");
			var temp = JSON.parse(programCourseDataResponse);
			for(var i in temp){
				courseOfferingData.push(temp[i]);
			}
			for (var i = 0; i < programCourses.length; i++) {
				addCourseToTable(programCourses[i]);
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

	//student has sufficient year status
	var courseObj = courseMap[course];
	if(courseObj.yearStatus !== undefined){
		if(courseObj.yearStatus > getUserYearStatus()){
			return false;
		}
	}

	if( !isOfferedNextSemester(course) ){
		return false;
	}

	if( !courseHasLectureSpace(course) ){
		return false;
	}

	if( !userHasTakenPrereqs(course) ){
		return false;
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

function isOfferedNextSemester(course){
	var semester = getNextSemester();
	var semesterShortCode;
	switch(semester){
		case "fall":
			semesterShortCode = "f";
			break;
		case "winter":
			semesterShortCode = "w";
			break;
		case "summer":
			semesterShortCode = "s";
			break;
		default:
			throw "invalid semester";
	}

	function isOfferedNextSemester(element){
		return element.term[0].toLowerCase() == semesterShortCode && element.course == course;
	}

	var offered = courseOfferingData.some(isOfferedNextSemester);

	return offered;
}

function getAllCouresOfName(course){
	var filtered = courseOfferingData.filter(isNameMatched);

	function isNameMatched(element){
		return element.course === course;
	}
	return filtered;
}

function getAllCourseOfferedNextSemester(){
	var semester = getNextSemester();
	var semesterShortCode;
	switch(semester){
		case "fall":
			semesterShortCode = "f";
			break;
		case "winter":
			semesterShortCode = "w";
			break;
		case "summer":
			semesterShortCode = "s";
			break;
		default:
			throw "invalid semester";
	}

	function isOfferedNextSemester(element){
		return element.term[0].toLowerCase() == semesterShortCode;
	}

	var filtered = courseOfferingData.filter(isOfferedNextSemester);

	return filtered;
}

 function courseHasLectureSpace(course){

 	var filtered = getAllCouresOfName(course);

 	function hasSpace(element){
 		if(!element.room_cap){
 			return true;
 		}
 		if(parseInt(element.room_cap) > parseInt(element.num_registered)){
 			return true;
 		}
 		return false;
 	}
 	return filtered.some(hasSpace);
 }

function courseHasLabOrTut(course){

	var filtered = getAllCouresOfName(course);
	function labOrTutFilter(element){
		return element.instr_type === 'LAB' || element.instr_type === 'TUT';
	}

	return filtered.some(labOrTutFilter);
}

function userHasTakenPrereqs(course){
	var courseObj = courseMap[course];

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

function getRegisterableCourses(){
	var registerableCourses = [];

	for (var i = 0; i < programCourses.length; i++) {
			if( !hasTaken(programCourses[i].course) && canTakeCourse(programCourses[i].course) ){
				registerableCourses.push(programCourses[i]);
			}

	}
	return registerableCourses;
}

function buildTimeTable(){
	//initialize 2d grid which contains posible 30 minute time slots for classes
	
	var timeArray = [805, 835, 905, 935, 1005, 1035, 1105, 1135, 1205, 1235, 1305, 1335, 1405, 1435, 1505, 1535, 1605, 1635, 1705, 1735, 1805, 1835, 1905, 1935, 2005, 2035, 2105];
	var timeTable = [];
	for(var i = 0 ; i < 5; i++){
		var day = [];
		for(j = 0 ; j < dayArray.length ; j++){
			day.push(null);
		}
		timeTable.push(day);
	}

}

function getAllSectionsOfCourse(course){
	function isNameMatched(element){
		return element.course === course;
	}

	return courseOfferingData.filter(isNameMatched);
}

function addCourseToSelectionTable(courseObject){
	var viewObject = {}
	viewObject.courseObject = courseObject;
	var domElem = $("<div/>");
	domElem.append(document.createTextNode(courseObject.course));
	viewObject.domElem = domElem;
	$("#course-selection").append(viewObject.domElem);
	$(domElem).click(function(){
		$(".section").remove();
		console.log(viewObject.courseObject.course + " clicked");
		var sections = getAllSectionsOfCourse(viewObject.courseObject.course);
		for(var i in sections){
			addSectionSelectionToTable(sections[i]);
		}
	});
}

function addSectionSelectionToTable(sectionObject){
	console.log("adding section");
	var viewObject = {};
	viewObject.sectionObject = sectionObject;
	var domElem = $("<div/>",{
		"class" : "section"
	});
	domElem.append(document.createTextNode(sectionObject.seq));
	viewObject.domElem = domElem;
	$("#section-selection").append(viewObject.domElem);
}


function populateCourseSelectionTable(){
	var registerableCourses = getRegisterableCourses();
	for(var i in registerableCourses){
		addCourseToSelectionTable(registerableCourses[i]);
	}
}
