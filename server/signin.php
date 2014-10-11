<?php

	$login = $_POST['email'];
	$password = $_POST['password'];

	echo $login . $password;

	$con=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");

	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$sql = "SELECT * FROM userslist WHERE login='$login' AND password='$password'";

	$rows = $con->query($sql);

	$num = $rows->num_rows;

	if($num > 0){
		echo "You are in";
	}
	else{
		echo "Error logging in";
	}

	if($con->query($sql)){
		echo "The record is added";
	}else{
		echo "The record cannot be added ". mysqli_error($con);
	}



?>