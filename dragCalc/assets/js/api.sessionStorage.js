$(function () {
	if (!!sessionStorage.hitCount){
		sessionStorage.hitCount = parseInt(sessionStorage.hitCount) + 1;;	
	}
	else{
		sessionStorage.hitCount = 1;
	}
	$('span', '#hits').text(sessionStorage.hitCount);
});
