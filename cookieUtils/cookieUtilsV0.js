var cookieUtils = {}
cookieUtils.check = function(name) {
	return document.cookie.split(/; |= |;|=/).indexOf(name) > -1;
};
cookieUtils.get = function(name) {
	// var cookieSplit = document.cookie.split(/[;=]/)
	// var cookieSplit = document.cookie.split(/; |= |;|=/),
	// 	nameIndex = cookieSplit.indexOf(name),
	// 	valueIndex = nameIndex + 1,
	// 	value = cookieSplit[valueIndex];
	// return valueIndex == 0 ? false : value;
	var cookieSplit = document.cookie.split(/; |= |;|=/);
	return this.check(name) ? cookieSplit[cookieSplit.indexOf(name) + 1] : false;
};
cookieUtils.set = function(name, value, duration) {
	var duration = duration || 365,
		expiry = '; expires=' + (new Date((new Date()).getTime() + duration * 24 * 60 * 60 * 1000)).toGMTString();
	document.cookie = name + '=' + value + expiry;
	return {
		name: name,
		value: value
	};
}
cookieUtils.delete = function(name) {
	this.set(name, '', -1);
	return this.check(name);
}