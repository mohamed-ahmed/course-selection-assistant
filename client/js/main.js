function getData(callback){
	var globaldata;
	$.get( "../server/main.php", function( data ) {
		console.log(data);
		callback(data);
	});
}