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
	'assets/js/Collections/CurrencyCollection',
	'assets/js/Views/CurrencyCollectionView'
	], function (Backbone, CurrencyCollection, CurrencyCollectionView) {
		var myCurrencyCollection = new CurrencyCollection();
		var myCurrencyCollectionView = new CurrencyCollectionView({collection: myCurrencyCollection});

		myCurrencyCollectionView.render().$el.appendTo($('#list'));

		myCurrencyCollection.fetch();
	});