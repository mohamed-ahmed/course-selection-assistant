<?php

	$connection = mysqli_connect("localhost", "root", NULL);

	$sql = "CREATE TABLE IF NOT EXISTS userslist(
		login VARCHAR(20),
		firstname VARCHAR(40),
		lastname VARCHAR(40),
		password VARCHAR(100),
		PRIMARY KEY (login)
	)";

	if ( mysqli_connect_errno()){
		echo "Failed to connect ". mysqli_connect_error();
		exit;
	}
	
	$sql = "CREATE DATABASE IF NOT EXISTS course_selection_assistant" ;
	$connection->query($sql);
	
	$connection = mysqli_connect("localhost", "root", NULL, "course_selection_assistant");
	$sql = "CREATE TABLE IF NOT EXISTS userslist(
		login VARCHAR(20),
		firstname VARCHAR(40),
		lastname VARCHAR(40),
		password VARCHAR(100),
		PRIMARY KEY (login)
	)";
	
	
	if($connection->query($sql)){
	
	}else{
		echo "Error encountered ".mysqli_error($connection);
	}
	

?>