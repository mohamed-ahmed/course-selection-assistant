function getData(){
	$.get( "../server/main.php", function( data ) {
		console.log(data);
	});
}