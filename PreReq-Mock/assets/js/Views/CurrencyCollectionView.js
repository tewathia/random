define([
	'jquery',
	'underscore',
	'backbone',
	'assets/js/Collections/CurrencyCollection',
	'assets/js/Views/CurrencyView'
], function ($, _, Backbone, CurrencyCollection, CurrencyView) {
	var CurrencyCollectionView = Backbone.View.extend({
		formTempId : '#formTemp',
		headerTempId: '#headerTemp',
		initialize: function () {
			this.listenTo(this.collection, 'all', this.render);
		},
		events: {
			"click #addEmp" : "onAddEmp"
		},
		render: function () {
			var $content = $('<table>');
			for(var i in this.collection.models){
				var _empView = new CurrencyView({model: this.collection.models[i]});
				$content.append(_empView.render().$el);
			}
			this.$el.html($(this.formTempId).html()).append($content);
			this.$el.find('table').prepend($(this.headerTempId).html());
			return this;
		},
		onAddEmp: function() {
			var newId = this.$el.find('#idInput').val();
			var newDesc = this.$el.find('#descInput').val();
			var date =  new Date();
            var _now =  date.getFullYear() + "-" + ("0" + (date.getMonth())).slice(-2)
            + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + (date.getHours())).slice(-2) + ":" +
            ("0" + (date.getMinutes())).slice(-2) + ":" + ("0" + (date.getSeconds())).slice(-2) + ".000" + "Z";
			this.collection.create({_id: newId, description: newDesc, update: _now, by: 'system'}).save();
		}

	});
	return CurrencyCollectionView;
});