<?php

include 'routes.php';




/*get URL*/
$urlString = $_SERVER['REQUEST_URI'];
$stringArray = split("/", $urlString);
foreach ($stringArray as $key => $value) {
  //echo $key . " ". $value . "\n";
}

if($stringArray[4] == "userCourses"){
	getUsersCourses();
  //echo "MATH 1004 MATH 1005";
}

if(count($stringArray) >= 6){
	if($stringArray[4] == "courses"){
		getCourses($stringArray[5]);
	}
}


// echo "$stringArray[3]: " . $stringArray[3];

if($stringArray[4] == "user"){

	getUser();
  //echo "MATH 1004 MATH 1005";
}

?>