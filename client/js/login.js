window.onload=function(){
	console.log("loaded");
	document.getElementById("login-button").onclick = function(){
		hideElement(document.getElementById("signup-form"));
		showElement(document.getElementById("login-form"));
	};

	document.getElementById("signup-button").onclick = function(){
		hideElement(document.getElementById("login-form"));
		showElement(document.getElementById("signup-form"));
	};

	document.getElementById("input-pattern").onclick = function(){
		if(!studentIsOnPattern()){
			showElement(document.getElementById("courses-taken-form-group"));
			populateCourseList();
		}
	}
};

function studentIsOnPattern(){
	return document.getElementById("input-pattern").value == "On";
}

function populateCourseList(){
	var program =  document.getElementById("input-program").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			console.log(xmlhttp.responseText);
			var courseArray = JSON.parse(xmlhttp.responseText);
			courseArray.forEach(function(elem){
				var domElem = dom("option", {value:elem.course}, document.createTextNode(elem.course));
				document.getElementById("input-courses").appendChild(domElem);
			});
		}
	}
	var url = "../server/main2.php/courses/" + program;
	xmlhttp.open("GET", url);
	xmlhttp.send();
}