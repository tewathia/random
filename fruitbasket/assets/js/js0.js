'use strict';
function init () {
	var market = document.getElementById('market'),
	basket = document.getElementById('basket'),
	onMarketItemClick,
	onBasketItemClick,
	fruits = document.getElementsByClassName('fruit');

	function onMarketItemClick () {
		var clickedFruit = this;
		basket.appendChild(clickedFruit);   
		clickedFruit.onclick = onBasketItemClick;
	};

	function onBasketItemClick () {
		var clickedFruit = this;
		market.appendChild(clickedFruit);
		clickedFruit.onclick = onMarketItemClick;
	}

	for (var i in fruits) {
		fruits[i].onclick = onMarketItemClick;
	}

}
