define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	var Currency = Backbone.Model.extend({
		url: "empURL",
		initialize: function () {
		},
		defaults: {
			_id: 'rupee',
			description: 'india',
			update: 'today',
			by: 'system'
		}
	});


	return Currency;
});