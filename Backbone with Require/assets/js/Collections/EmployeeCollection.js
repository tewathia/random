define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'assets/js/Models/Employee'
], function (_, Backbone, Store, Employee) {
	var EmployeeCollection = Backbone.Collection.extend({
		model: Employee,
		localStorage: new Backbone.LocalStorage("EmployeesLS")
	});


	return EmployeeCollection;
});