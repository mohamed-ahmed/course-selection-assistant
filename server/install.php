<?php


	$endl = "</br>";
	
	$connection = mysqli_connect("localhost", "root", NULL, "course_selection_assistant");


	if ( mysqli_connect_errno()){
		echo "Failed to connect ". mysqli_connect_error();
		exit;
	}{
		echo "Database connected" . $endl;
	}
	

	$sql_command = "CREATE TABLE IF NOT EXISTS userslist(
		login VARCHAR(40),
		firstname VARCHAR(40),
		lastname VARCHAR(40),
		password VARCHAR(100),
		program VARCHAR(40),
		PRIMARY KEY (login)
	)";
	
	run_sql_command($connection, $sql_command);


	$sql_command = "CREATE TABLE IF NOT EXISTS course_program(
		course VARCHAR(20),
		program VARCHAR(40),
		term VARCHAR(4)
	)";
	
	run_sql_command($connection, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS off_pattern_courses_completed(
		login VARCHAR(40),
		course VARCHAR(20)
	)";

	run_sql_command($connection, $sql_command);

	function run_sql_command($connection, $command){
		if($connection->query($command)){
			echo "working";
		}else{
			echo "Error encountered ".mysqli_error($connection);
		}
	}	

?>

