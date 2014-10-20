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
};