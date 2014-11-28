<?php


/*create database connection*/

$con=mysqli_connect("127.0.0.1", "root", NULL, NULL);
	$sql_command = "CREATE DATABASE IF NOT EXISTS course_selection_assistant;";
	run_sql_db_command($con, $sql_command);


$con=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");

	// Check connection
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


function run_sql_db_command($con, $command){
	if($con->query($command)){
		
	}else{
		echo "Error encountered ".mysqli_error($con);
	}
}	



?>