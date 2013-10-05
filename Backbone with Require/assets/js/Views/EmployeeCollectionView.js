define([
	'jquery',
	'underscore',
	'backbone',
	'assets/js/Collections/EmployeeCollection',
	'assets/js/Views/EmployeeView'
], function ($, _, Backbone, EmployeeCollection, EmployeeView) {
	var EmployeeCollectionView = Backbone.View.extend({
		formTempId : '#formTemp',
		headerTempId: '#headerTemp',
		initialize: function () {
			console.log('!collection view initialized!');
			this.listenTo(this.collection, 'all', this.render);
		},
		events: {
			"click #addEmp" : "onAddEmp"
		},
		render: function () {
			console.log('!collection view rendered!');
			var $content = $('<table>');
			for(var i in this.collection.models){
				var _empView = new EmployeeView({model: this.collection.models[i]});
				$content.append(_empView.render().$el);
			}
			this.$el.html($(this.formTempId).html()).append($content);
			this.$el.find('table').prepend($(this.headerTempId).html());
			return this;
		},
		onAddEmp: function() {
			console.log('!add clicked!');
			var newName = this.$el.find('#nameInput').val();
			var newRole = this.$el.find('#roleInput').val();
			this.collection.create({name: newName, role: newRole}).save();
		}

	});
	return EmployeeCollectionView;
});