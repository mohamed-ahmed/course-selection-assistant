var globaldata;

var userObject;

var courseOfferingData = [];

var programCourses;

var timeArray = [805, 835, 905, 935, 1005, 1035, 1105, 1135, 1205, 1235, 1305, 1335, 1405, 1435, 1505, 1535, 1605, 1635, 1705, 1735, 1805, 1835, 1905, 1935, 2005, 2035, 2105];
var dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function getCourses(){
	$.get( "../server/main2.php/userCourses", function( data ) {
		//console.log(data);
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
	//console.log("in add course to year: " + courseName);
	var yearObject = $( $(".year")[yearNumber-1] );



	var courseObject = dom("div", {class:"course " + courseType}, document.createTextNode(courseName));

	yearObject.append(courseObject);

}

function addCourseToTable(course){
	//console.log(course);
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

	$("#build-time-table").click(function(){
		populateCourseSelectionTable();
	});
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



function getAllSectionsOfCourse(course){
	function isNameMatched(element){
		return element.course === course;
	}

	return courseOfferingData.filter(isNameMatched);
}

function addCourseToSelectionTable(courseObject){
	var viewObject = {}
	viewObject.courseObject = courseObject;
	var domElem = $("<option/>",{
		"class" : "course-object"
	});
	domElem.append(document.createTextNode(courseObject.course));
	viewObject.domElem = domElem;
	$("#course-selection").append(viewObject.domElem);
	$(domElem).click(function(){
		$(".section-object").remove();
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
	var seatsLeft = parseInt(sectionObject.room_cap) - parseInt(sectionObject.num_registered);
	var availabilityString = sectionObject.room_cap > 0 ? " " + seatsLeft + " seatsLeft" : " unlimited seats";
	var domElem = dom("option",{"class" : "section-object"},
						(document.createTextNode(sectionObject.seq + availabilityString))					
					);
	viewObject.domElem = domElem;
	$("#section-selection").append(viewObject.domElem);
	sectionObject.clicked = false;
	$(domElem).click(function(){
		if(sectionObject.clicked !== true){
			viewObject.registerButton = new RegisterButton(sectionObject);
			viewObject.registerButton.render();

			if(!sectionObject.onTable){
				viewObject.tableView = addSectionToTimeTable(viewObject);
			}
			sectionObject.clicked = true;
			
		}
	});
	$(domElem).mouseenter(function(){
		if(sectionObject.clicked !== true){
			viewObject.tableView = addSectionToTimeTable(viewObject);
			sectionObject.onTable = true;
			console.log(viewObject.tableView);
			$(domElem).addClass("hovered");
			console.log(viewObject);
		}
	});

	$(domElem).mouseleave(function(){
		if(sectionObject.clicked !== true){
			//removeSectionFromTable(sectionObject);
			$(viewObject.tableView).remove();
			$(domElem).removeClass("hovered");
			sectionObject.onTable = false;
			markConflicts();
		}
	});

}


function populateCourseSelectionTable(){
	var registerableCourses = getRegisterableCourses();
	for(var i in registerableCourses){
		addCourseToSelectionTable(registerableCourses[i]);
	}
}

function addSectionToTimeTable(viewObject){
	var ids = getSectionElementIds(viewObject.sectionObject);
	viewObject.timeTableEntries = [];
	for(var i in ids){
		var deleteIconElem = dom("img", {"class" : "delete-icon", src: "img/x-icon.png"});
		$(deleteIconElem).click(function(){
			$(viewObject.timeTableEntries).remove();
			var elem = viewObject.registerButton.buttomELem
			$(elem).remove();
		});
		var courseView = dom("div", {"class":getSectionIDString(viewObject.sectionObject) + " time-table-entry" },
							document.createTextNode(viewObject.sectionObject.course),
							deleteIconElem
						);
		viewObject.timeTableEntries.push(courseView);
		$("#" + ids[i]).append(courseView);
	}

	markConflicts();
	return viewObject.timeTableEntries;



	

}

function markConflicts(){
	$(document).ready(function(){;
		for(var i in dayArray){
			for(var j in timeArray){
				var idString = dayArray[i] + "-" + timeArray[j];
				if( $("#" + idString).children().length > 1 ){
					$("#" + idString).addClass("conflict-cell");
				}
				if( $("#" + idString).children().length <= 1 ){
					$("#" + idString).removeClass("conflict-cell");
				}
			}
		}
	});
}

/*function addSectionToTimeTable(sectionObject){
	var ids = getSectionElementIds(sectionObject);
	for(var i in ids){
		$("#" + ids[i]).text(sectionObject.course);
	}
}
*/

/*function removeSectionFromTable(sectionObject){
	console.log("remove: " + sectionObject.course);
	var classString = getSectionIDString(sectionObject);
	$("." + classString).remove();

	$(document).ready(function(){;
		for(var i in dayArray){
			for(var j in timeArray){
				var idString = dayArray[i] + "-" + timeArray[j];
				if( $("#" + idString).children().length < 2 ){
					$("#" + idString).removeClass("conflict-cell");
				}
			}
		}
	});
}*/

function getSectionElementIds(sectionObject){
	var days = [];
	for(var i in sectionObject.days){
		var dayChar = sectionObject.days[i];
		var dayString;
		switch(dayChar){
			case "M":
			dayString = "Monday";
			break;
			case "T":
			dayString = "Tuesday";
			break;
			case "W":
			dayString = "Wednesday";
			break;
			case "R":
			dayString = "Thursday";
			break;
			case "F":
			dayString = "Friday";
			break;
			default:
			throw "invalid day";
		}
		days.push(dayString);
	}
	console.log(days);

	var times = [];
	var index = timeArray.indexOf(parseInt(sectionObject.start_time));
	console.log(index);
	while(timeArray[index] < parseInt(sectionObject.end_time)){
		times.push( timeArray[index] );
		index++;
	}
	var ids = [];
	for(var time in times){
		for(var day in days){
			var idString = days[day] + "-" + times[time];
			//console.log(idString);
			ids.push(idString);
		}
	}
	return ids;
}

function getSectionIDString(sectionObject){
	return "timeslot-" + sectionObject.course.split(" ")[0] + "-" + sectionObject.course.split(" ")[1] + "-" + sectionObject.seq;
}

function RegisterButton(sectionObject){
	this.sectionObject = sectionObject;
}

RegisterButton.prototype.render = function() {
	console.log(this.sectionObject);
	var dataObj = this.sectionObject;
	var buttonText = this.sectionObject.course + " " + this.sectionObject.seq;
	this.statusElem = dom("div", {"class" : "status-text"}, document.createTextNode("Status"));
	this.buttomELem = dom("button",{"class" : "register-button"},
						document.createTextNode("Register for " + buttonText)
						);
	$("#registration-submission-container").append(this.buttomELem);
	//$(document).ready(function(){
		$(this.buttomELem).click(function(){
			console.log("clicked");
			$.ajax({
				type : "POST",
				url : "../server/main2.php/register",
				data : dataObj
			}).done(function(msg){
				console.log(msg);
				if(msg==="success"){
					$(this.statusElem).text("Status: success");
				}
				else{
					$(this.statusElem).text("Status: failure");
				}
			});
		})
	//});
};

RegisterButton.prototype.removeELem = function(){
	$(this.buttonElem).remove();
}