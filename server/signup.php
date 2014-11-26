<?php

include 'db.php';


	$login = $_POST['email'];
	$firstname = $_POST['first-name'];
	$lastname = $_POST['last-name'];
	$password = $_POST['password'];
	$program = $_POST['program'];
	$pattern = $_POST['pattern'];
	$status = intval($_POST['status']);
	if($pattern == "Off" && !empty($_POST['courses'])){
		$year = 0;
		$courses = $_POST['courses'];
		foreach ($courses as  $value) {
			print $value;
		}
	}
	if($pattern == "On" && !empty($_POST['year'])){
		$status = intval($_POST['year'] + 1);
		$year = intval($_POST['year']);
	}
	echo $login . $firstname . $lastname . $password;


	$sql_command = "INSERT INTO userslist VALUES('$login', '$firstname', '$lastname', '$password', '$program', '$status', '$year', '$pattern')";

	run_sql_command($con, $sql_command);

	if($pattern == "Off" && !empty($_POST['courses'])){
		foreach ($courses as  $value) {
			print $value;
			$sql_command = "INSERT INTO off_pattern_courses_completed VALUES('$login', '$value')";
			run_sql_command($con, $sql_command);
		}
	}



	function run_sql_command($con, $command){
		if($con->query($command)){
		
		}else{
			echo "Error encountered ".mysqli_error($con);
		}
	}	
	

?>