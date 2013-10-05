require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
			'underscore',
			'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: 'assets/lib/jquery',
		underscore: 'assets/lib/underscore',
		backbone: 'assets/lib/backbone',
		backboneLocalstorage: 'assets/lib/backbone.localStorage',
	}
});

require([
	'backbone',
	'assets/js/Collections/EmployeeCollection',
	'assets/js/Views/EmployeeCollectionView'
	], function (Backbone, EmployeeCollection, EmployeeCollectionView) {
		var myEmployeeCollection = new EmployeeCollection();
		var myEmployeeCollectionView = new EmployeeCollectionView({collection: myEmployeeCollection});

		myEmployeeCollectionView.render().$el.appendTo($('#list'));

		myEmployeeCollection.fetch();
	});