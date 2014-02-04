var cookieUtils = {
	check: function(name) {
		return document.cookie.split(/; |= |;|=/).indexOf(name) > -1;
	},
	get: function(name) {
		var cookieSplit = document.cookie.split(/; |= |;|=/);
		return this.check(name) ? cookieSplit[cookieSplit.indexOf(name) + 1] : false;
	},
	set: function(name, value, duration) {
		var duration = duration || 365,
			expiry = '; expires=' + (new Date((new Date()).getTime() + duration * 24 * 60 * 60 * 1000)).toGMTString();
		document.cookie = name + '=' + value + expiry;
		return {
			name: name,
			value: value
		};
	},
	delete: function(name) {
		// var exists = this.check(name);
		// if (exists) {
		// 	this.set(name, '', -1);
		// }
		// return exists;

		if (this.check(name)) {
			this.set(name, '', -1);
		} else {
			throw new Error('Cookie not found.')
		}
		return !this.check(name);
	}
}