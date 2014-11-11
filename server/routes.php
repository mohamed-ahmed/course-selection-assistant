<?php

session_start();

function getUsersCourses(){
	$program = $_SESSION['program'];
	getCourses($program);
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

?>