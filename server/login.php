<?php
	
	include 'db.php';


	define("endl", "</br>");
	$login = $_POST['email'];
	$password = $_POST['password'];



	$sql = "SELECT * FROM userslist WHERE login='$login' AND password='$password'";

	$result = $con->query($sql);
	



	$num = $result->num_rows;

	if($num > 0){
		echo "You are in ";

		session_start();

		while($row = mysqli_fetch_array($result)){

			$program = $row['program'];
		}

	 	echo "Program: " . $program . endl;

	 	$_SESSION['login'] = $login;
	 	$_SESSION['program'] = $program;
	 	echo "session " . $_SESSION['login'] . endl;

	 	echo "redirecting...";
	 	header("refresh:1;url=../client/index.html");



	}
	else{
		echo "Error logging in";
	}




?>