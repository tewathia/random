define([
	'jquery',
	'underscore',
	'backbone',
], function ($, _, Backbone) {
	var EmployeeView = Backbone.View.extend({
		tagName: 'tr',
		initialize: function () {
			console.log('!model view initialized!');
			this.listenTo(this.model, 'change', this.render);
		},
		events: {
			"click #btnRem" : "onRemoveEmp"
		},
		render: function () {
			console.log('!model view rendered!');
			this.$el.html($('<td>' + this.model.get('name') + '</td><td>' + this.model.get('role') + '</td><td><input type="button" id="btnRem" value="Remove"></input></td>'));
			return this;
		},
		onRemoveEmp: function () {
			this.model.destroy();
			this.render();
			this.remove();
		}
	});

	return EmployeeView;
});