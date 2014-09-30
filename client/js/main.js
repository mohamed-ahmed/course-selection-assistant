function getData(){
	var globaldata;
	$.get( "../server/main.php", function( data ) {
		console.log(data);
		globaldata = data;
	});
	return globaldata;
}