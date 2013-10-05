define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	var Employee = Backbone.Model.extend({
		url: "empURL",
		initialize: function () {
			console.log('!model initialized!');
		},
		defaults: {
			name: 'dummy Name',
			role: 'dummy Role'
		}
	});


	return Employee;
});