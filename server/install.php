<?php

	include 'db.php';
	include 'insertion_data.php';


	$endl = "</br>";
	
	//create database;

	
	$sql_command = "USE course_selection_assistant;";
	run_sql_command($con, $sql_command);

	//create tables;


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
		completion varchar(20) DEFAULT NULL
	);";
	
	run_sql_command($con, $sql_command);

	$sql_command = "CREATE TABLE IF NOT EXISTS registration (
		email varchar(40) DEFAULT NULL,
		course varchar(20) DEFAULT NULL,
		completion varchar(20) DEFAULT NULL
	);";
	
	run_sql_command($con, $sql_command);
	
	$sql_command = "CREATE TABLE IF NOT EXISTS userslist (
		login varchar(40) NOT NULL DEFAULT '',
		firstname varchar(40) DEFAULT NULL,
		lastname varchar(40) DEFAULT NULL,
		password varchar(100) DEFAULT NULL,
		program varchar(40) DEFAULT NULL,
		status int(11) NOT NULL,
		year int(11) NOT NULL,
		pattern varchar(20) NOT NULL
	);";
	
	run_sql_command($con, $sql_command);

	
	run_multi_sql_command($con, $sqlData);


	function loadCSVIntoDB($filename, $table, $con){
		$file_directory = "../../htdocs/couse-selection-assistant/" . $filename;
		$sql_command = "load data local infile '" . $file_directory . "' into table " . $table . " fields terminated by ',' enclosed by '\"' lines terminated by '\n' ";
		echo "</br>" .  $sql_command . "</br>";
		run_sql_command($con, $sql_command);
	}





	function run_sql_command($con, $command){
		if($con->query($command)){
		}else{
			echo "Error encountered ".mysqli_error($con);
		}
	}	

	function run_multi_sql_command($con, $command){
		if($con->multi_query($command)){
			echo "working" . "</br>";
		}else{
			echo "Error encountered ".mysqli_error($con);
		}
	}

?>

