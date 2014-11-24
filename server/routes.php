<?php

session_start();

function getUsersCourses(){
	$program = $_SESSION['program'];
	getCourses($program);
}


function getAllCourseData(){

	$program = $_SESSION['program'];

	$con=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");


	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}



	$sql = " SELECT * from course_program join courses on course_program.course = courses.course WHERE program='$program';";
	//SQL get courses from isFromProgram where program = $program

	$result = mysqli_query($con, $sql);

	$course_array = array(); 

	while($row = mysqli_fetch_array($result)){
	 	// echo $row['course'] . "\n";

	 	/*$obj = array();
	 	$obj["course"] = $row["course"];
	 	$obj["term"] = $row["term"];*/
	 	$obj = array();
	 	$obj["course"] = $row["course"];
	 	$obj["term"] = $row["term"];
	 	$obj["program"] = $row["program"];
	 	$obj["term"] = $row["term"];
	 	$obj["seq"] = $row["seq"];
	 	$obj["catalog_title"] = $row["catalog_title"];
	 	$obj["instr_type"] = $row["instr_type"];
	 	$obj["days"] = $row["days"];
	 	$obj["start_time"] = $row["start_time"];
	 	$obj["end_time"] = $row["end_time"];
	 	$obj["room_cap"] = $row["room_cap"];
	 	$obj["num_registered"] = $row["num_registered"];
	 	$obj["sem"] = $row["sem"];


		array_push($course_array, $obj);
	}

	echo json_encode($course_array);


}


function getCourses($program){

	$con=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");


	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}



	$sql = "SELECT * FROM course_program WHERE program='$program'";
	//SQL get courses from isFromProgram where program = $program

	$result = mysqli_query($con, $sql);

	$course_array = array(); 

	while($row = mysqli_fetch_array($result)){
	 	// echo $row['course'] . "\n";

	 	$obj = array();
	 	$obj["course"] = $row["course"];
	 	$obj["term"] = $row["term"];
		array_push($course_array, $obj);
	}

	echo json_encode($course_array);


}


function getUser(){
	$userObject = array();
	$login = $_SESSION['login'];

	$userObject["login"] = $login;

	$con=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");


	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}



	$sql = "SELECT * FROM off_pattern_courses_completed WHERE login='$login'";
	$result = mysqli_query($con, $sql);

	$userObject["coursesCompleted"] = array();
	$result = mysqli_query($con, $sql);

	while($row = mysqli_fetch_array($result)){
		array_push($userObject["coursesCompleted"], $row["course"]);
	}

	echo json_encode($userObject);
}


function register($courseSectionObj){
	$con=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");


	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$course=$courseSectionObj["course"];
	$seq = $courseSectionObj["seq"];
	$sem = $courseSectionObj["sem"];
	echo $course;
	echo $seq;

	$sql = "SELECT * FROM courses WHERE course='$course' and seq = '$seq' and sem='$sem';";

	$result = mysqli_query($con, $sql);

	while($row = mysqli_fetch_array($result)){

		$room_cap = $row['room_cap'];
		$num_registered = $row['num_registered'];

	}

	$num_registered = intval($num_registered) + 1;
	echo $num_registered;

	if($room_cap > 0){
		if($room_cap > $num_registered){
			$sql = "UPDATE courses SET num_registered='$num_registered' WHERE course='$course' AND seq='$seq' AND sem='$sem';";
			mysqli_query($con, $sql);
			echo "success";
		}
		else{
			echo "fail";
		}
	}
	else{
		echo "success";
	}

}

?>