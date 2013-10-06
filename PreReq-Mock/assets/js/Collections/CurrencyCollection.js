define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'assets/js/Models/Currency'
], function (_, Backbone, Store, Currency) {
	var CurrencyCollection = Backbone.Collection.extend({
		model: Currency,
		// url: "http://andrew:test@localhost:3000/currencies/",
		localStorage: new Store("CurrencyLS")
	});


	return CurrencyCollection;
});