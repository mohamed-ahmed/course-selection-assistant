function getData(callback){
	var globaldata;
	$.get( "../server/main.php", function( data ) {
		console.log(data);
		callback(data);
	});
}

function addCourseToYear(yearNumber, courseName){
	var yearObject = $( $(".year")[yearNumber-1] );

	var courseObject = dom("div", {class:"course"}, document.createTextNode(courseName));

	yearObject.append(courseObject);

}