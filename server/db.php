<?php


	/*create database connection*/
	

		$con=mysqli_connect("127.0.0.1", "root", NULL, "course_selection_assistant");

	// Check connection
		if (mysqli_connect_errno()) {
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
	
	




?>