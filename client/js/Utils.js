	/*
	creates cookies
	@param {String} name -  of coookie
	@param {String} valie - value of coookie
	@param {number} days -  number of days for coookie to stay active
	*/
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

	/*
	creates cookies
	@param {String} name -  of coookie
	@return {String} valie - value of coookie
	*/

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

	/*
	*	erases cookies
	*	@param {String} name -  of coookie
	*/
function eraseCookie(name) {
	createCookie(name,"",-1);
}


/*adds functions to the dom

it works such as dom("element_type like div or h1", {attribute:"value"}, list_of_doms)

*/


function dom(name, attributes) {
	var node = document.createElement(name);
	if (attributes) {
		forEachIn(attributes, function(name, value) {
			setNodeAttribute(node, name, value);
		});
	}
	for (var i = 2; i < arguments.length; i++) {
		var child = arguments[i];
		if (typeof child == "string")
			child = document.createTextNode(child);
		node.appendChild(child);
	}
	return node;
}

function forEachIn(object, action) {
	for (var property in object) {
		if (object.hasOwnProperty(property))
			action(property, object[property]);
	}
}

function setNodeAttribute(node, attribute, value) {
	if (attribute == "class")
		node.className = value;
	else if (attribute == "checked")
		node.defaultChecked = value;
	else if (attribute == "for")
		node.htmlFor = value;
	else if (attribute == "style")
		node.style.cssText = value;
	else
		node.setAttribute(attribute, value);
}

function hideElement(element){
	element.style.display="none";
}

function showElement(element){
	element.style.display="block";
}


//testing commit