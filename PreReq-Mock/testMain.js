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
		chai: 'assets/lib/chai',
		sinonChai: 'assets/lib/sinon-chai',
	}
});

require([
	'backbone',
	'assets/js/Collections/CurrencyCollection',
	'assets/js/Views/CurrencyCollectionView',
	'chai',
	'sinonChai'
	], function (Backbone, CurrencyCollection, CurrencyCollectionView, chai, sinonChai) {
		describe('Currency', function () {
				var myCurrencyCollection = new CurrencyCollection();
				var myCurrencyCollectionView = new CurrencyCollectionView({collection: myCurrencyCollection});
			it("can test", function(){
				chai.assert.isTrue(true);
			});
			it("can fetch Currencies", function(){
				chai.assert.isTrue(myCurrencyCollection.fetch() instanceof Object, 'not an object');
				chai.assert.isTrue(myCurrencyCollection.models.length > 0, 'zero model length')
			});
			it("can add a Currency", function(){
				myCurrencyCollection.fetch();
				var _oldCount = myCurrencyCollection.models.length;
				console.log(_oldCount);
				myCurrencyCollectionView.onAddEmp();
				var _newCount = myCurrencyCollection.models.length;
				chai.assert.equal(_oldCount+1, _newCount);
			});
		});








		mocha.run();
	});