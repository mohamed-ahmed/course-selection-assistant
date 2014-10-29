<?php

	$login = $_POST['email'];
	$firstname = $_POST['first-name'];
	$lastname = $_POST['last-name'];
	$password = $_POST['password'];
	$program = $_POST['program'];
	$pattern = $_POST['pattern'];
	if($patter == "Off"){
		$courses = $_POST['courses'];
	}
	foreach ($courses as  $value) {
		print $value;
	}

	echo $login . $firstname . $lastname . $password;

	$connection=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");

	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$sql_command = "INSERT INTO userslist VALUES('$login', '$firstname', '$lastname', '$password', '$program')";

	run_sql_command($connection, $sql_command);

	if($pattern == "Off"){
		foreach ($courses as  $value) {
			print $value;
			$sql_command = "INSERT INTO off_pattern_courses_completed VALUES('$login', '$value')";
			run_sql_command($connection, $sql_command);
		}
	}


	function run_sql_command($connection, $command){
		if($connection->query($command)){
		
		}else{
			echo "Error encountered ".mysqli_error($connection);
		}
	}	
	

?>