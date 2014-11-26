<?php

	include 'db.php';

	$endl = "</br>";
	

	//create ables;

	$sql_command = "CREATE TABLE IF NOT EXISTS userslist(
		login VARCHAR(40),
		firstname VARCHAR(40),
		lastname VARCHAR(40),
		password VARCHAR(100),
		program VARCHAR(40),
		PRIMARY KEY (login)
	)";
	
	run_sql_command($con, $sql_command);


	$sql_command = "CREATE TABLE IF NOT EXISTS course_program(
		course VARCHAR(20),
		program VARCHAR(40),
		term VARCHAR(4)
	)";
	
	run_sql_command($con, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS off_pattern_courses_completed(
		login VARCHAR(40),
		course VARCHAR(20)
	)";

	run_sql_command($con, $sql_command);

	function run_sql_command($con, $command){
		if($con->query($command)){
			echo "working";
		}else{
			echo "Error encountered ".mysqli_error($con);
		}
	}	

?>

