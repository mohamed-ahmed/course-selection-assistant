var globaldata;


function getData(callback){
	$.get( "../server/main2.php/courses", function( data ) {
		console.log(data);
		// callback(data);
		globaldata = data;
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

function callback(value){
	globaldata = value;
}


