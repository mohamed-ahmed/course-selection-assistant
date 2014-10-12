<?php

	$login = $_POST['email'];
	$firstname = $_POST['first-name'];
	$lastname = $_POST['last-name'];
	$password = $_POST['password'];
	$program = $_POST['program'];

	echo $login . $firstname . $lastname . $password;

	$con=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");

	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$sql = "INSERT INTO userslist VALUES('$login', '$firstname', '$lastname', '$password', '$program')";
	if($con->query($sql)){
		echo "The record is added";
	}else{
		echo "The record cannot be added ". mysqli_error($con);
	}

	

?>