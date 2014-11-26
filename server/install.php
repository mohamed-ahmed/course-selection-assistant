<?php

	include 'db.php';

	$endl = "</br>";
	

	//create ables;
	
	$sql_command = "CREATE DATABASE IF NOT EXISTS course_selection_assistant;";
	run_sql_command($con, $sql_command);

	$sql_command = "USE course_selection_assistant;";
	run_sql_command($con, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS courses (
		course varchar(20) DEFAULT NULL,
		seq varchar(20) DEFAULT NULL,
		catalog_title varchar(20) DEFAULT NULL,
		instr_type varchar(20) DEFAULT NULL,
		days varchar(20) DEFAULT NULL,
		start_time int(11) DEFAULT NULL,
		end_time int(11) DEFAULT NULL,
		room_cap int(11) DEFAULT NULL,
		num_registered int(11) DEFAULT NULL,
		sem varchar(2) DEFAULT NULL
	);";
	
	run_sql_command($con, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS course_program (
		course varchar(20) DEFAULT NULL,
		program varchar(40) DEFAULT NULL,
		term varchar(4) DEFAULT NULL
	);";
	
	run_sql_command($con, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS off_pattern_courses_completed (
		login varchar(40) DEFAULT NULL,
		course varchar(20) DEFAULT NULL
	);";
	
	run_sql_command($con, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS prereqs (
		course varchar(20) DEFAULT NULL,
		requires varchar(20) DEFAULT NULL,
		optional varchar(20) DEFAULT NULL
	);";
	
	run_sql_command($con, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS registration (
		email varchar(40) DEFAULT NULL,
		course varchar(20) DEFAULT NULL,
		'completion' varchar(20) DEFAULT NULL
	);";
	
	run_sql_command($con, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS registration (
		email varchar(40) DEFAULT NULL,
		course varchar(20) DEFAULT NULL,
		'completion' varchar(20) DEFAULT NULL
	);";
	
	run_sql_command($con, $sql_command);
	
	$sql_command = "CREATE TABLE IF NOT EXISTS userslist (
		login varchar(40) NOT NULL DEFAULT '',
		firstname varchar(40) DEFAULT NULL,
		lastname varchar(40) DEFAULT NULL,
		'password' varchar(100) DEFAULT NULL,
		program varchar(40) DEFAULT NULL,
		'status' int(11) NOT NULL,
		'year' int(11) NOT NULL,
		pattern varchar(20) NOT NULL
	);";
	
	run_sql_command($con, $sql_command);


	function run_sql_command($con, $command){
		if($con->query($command)){
			echo "working";
		}else{
			echo "Error encountered ".mysqli_error($con);
		}
	}	

?>

