<?php
	
	include 'db.php';


	define("endl", "</br>");
	$login = $_POST['email'];
	$password = $_POST['password'];

	echo $login . " " . $password . endl;

	

	$sql = "SELECT * FROM userslist WHERE login='$login' AND password='$password'";

	$result = $con->query($sql);
	



	$num = $result->num_rows;

	if($num > 0){
		echo "You are in";

		session_start();

		while($row = mysqli_fetch_array($result)){

			$program = $row['program'];
		}

	 	echo "Program is " . $program . endl;

	 	$_SESSION['login'] = $login;
	 	$_SESSION['program'] = $program;
	 	echo "session " . $_SESSION['login'] . endl;

	 	header("refresh:3;url=../client/index.html");



	}
	else{
		echo "Error logging in";
	}




?>