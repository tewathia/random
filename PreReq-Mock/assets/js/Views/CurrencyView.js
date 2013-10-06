define([
	'jquery',
	'underscore',
	'backbone',
], function ($, _, Backbone) {
	var CurrencyView = Backbone.View.extend({
		tagName: 'tr',
		rowTempId: '#rowTemp',

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		events: {
			"click #btnRem" : "onRemoveEmp"
		},
		render: function () {
			this.$el.html(Handlebars.compile($(this.rowTempId).html())(this.model.attributes));
			return this;
		},
		onRemoveEmp: function () {
			this.model.destroy();
			this.render();
			this.remove();
		}
	});

	return CurrencyView;
});