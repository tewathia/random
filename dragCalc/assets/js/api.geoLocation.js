$(function () {

	navigator.geolocation.getCurrentPosition(showPos, showError);

	function showPos (pos) {
		position = pos.coords.latitude + ',' + pos.coords.longitude;		
		$('span', '#location').text(position);
	
	}

	function showError(error){
	$('span', '#location').text(error.message);	
	}


});
