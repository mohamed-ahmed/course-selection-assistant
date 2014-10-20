<?php




	
	$connection = mysqli_connect("localhost", "root", NULL, "course_selection_assistant");


	if ( mysqli_connect_errno()){
		echo "Failed to connect ". mysqli_connect_error();
		exit;
	}
	

	$sql = "CREATE TABLE IF NOT EXISTS userslist(
		login VARCHAR(40),
		firstname VARCHAR(40),
		lastname VARCHAR(40),
		password VARCHAR(100),
		program VARCHAR(40),
		PRIMARY KEY (login)
	)";
	
	if($connection->query($sql)){
	
	}else{
		echo "Error encountered ".mysqli_error($connection);
	}

	$sql = "CREATE TABLE IF NOT EXISTS course_program(
		course VARCHAR(20),
		program VARCHAR(40),
		term VARCHAR(4)
	)";
	
	if($connection->query($sql)){
	
	}else{
		echo "Error encountered ".mysqli_error($connection);
	}
	

?>