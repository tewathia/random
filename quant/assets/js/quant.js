var quant = {
	factors : function (n){
		var factors = [];
		for (var i = 0; i <= n/2; i++){
			if (n%i===0){
				factors.push(i);
			}
		}
		factors.push(n);
		return factors;
	},


	tripletsCount : function (n) {
		var count = 0;
		var factorsList = this.factors(n);
		oneCount = 0;
		var f = 2310/2;
		for (var i = 1; i<=f; i++){
			for (var j = i; j<=f; j++){
				for (var k = j; k<=f; k++){
					if (i*j*k === n){
						count += 1;
						console.log(i, j, k, i*j*k);
						if (i==1) {
							oneCount+=1;
						}
					}
				}
			}
		}
		return count;
	},


	Lottery: function() {
		var _array = [],
		args = arguments,
		isArray = (args[0] instanceof Array);
		if(!isArray) {
			for (var i in args) {
				_array.push(args[i]);
			}
		}
		else {
			_array = args[0];
		}
		this.pickWinner = function() {
			if (_array.length > 0) {
				var _winnerIndex = Math.floor(Math.random()*(_array.length));
				var _winner = _array.splice(_winnerIndex, 1);
				return _winner;
			}
			else {
				throw new Error('No More Winners can be picked!');
			}
		};
		this.addParticipant = function(name) {
			_array.push(name);
		};
	},

	CowsAndBulls: function (num) {
		var n = ((num<10) && (num>0)) ? num : 4;
		var _generateRandomNumber = function(n) {
			var _numArr = [];
			var _finalNum = 0;
			for (var i = 1; i < 10; i++) {
				_numArr.push(i);
			}
			for (var j = 0; j < n; j++) {
				var _index = Math.floor(Math.random()*_numArr.length);
				_finalNum += _numArr[_index]*Math.pow(10, j);
				_numArr.splice(_index, 1);
			}
			return _finalNum;
		};
		var _toBeGuessed = _generateRandomNumber(n);

		this.giveUp = function () {
			console.log('The Number was ' + _toBeGuessed);
			return _toBeGuessed;
		};

		this.log = [],

		this.isIt = function (guess) {
			var _getCount = function (string) {
				var _countObj = {};
				var _guessString = guess + '';
				var _toBeGuessedString = _toBeGuessed + '';
				var _cows = 0;
				var _bulls = 0;
				var _checkGuessFormat = function (val) {
					var _isProper = false;
					var _indexSum = 0;
					var _expectedIndexSum = (9-val)*(-1) + val*(val-1)/2;
					for (var i = 1; i < 10; i++) {
						_indexSum += _guessString.indexOf(i);
					}
					if (_indexSum === _expectedIndexSum) {
						_isProper = true;
					}
					return _isProper;
				};
				if (_guessString.length !== _toBeGuessedString.length) {
					throw new Error('Your guess must have ' + n + ' digits. Please try again.');
				}
				if (!_checkGuessFormat(_guessString.length)) {
					throw new Error('Your guess has some repeating digits. Please try again.');
				}
				for (var i in _guessString) {
					var _tBGIndex = _toBeGuessedString.indexOf(_guessString[i]);
					var _gIndex = _guessString.indexOf(_guessString[i]);
					if (_tBGIndex !== -1) {
						_cows++;
						if (_tBGIndex === _gIndex) {
							_bulls++;
						}
					}
				}
				_countObj['Cows'] = _cows;
				_countObj['Bulls'] = _bulls;
				return _countObj;
			};
			var _finalCountObj = _getCount();
			var _cowCount = _finalCountObj.Cows;
			var _bullCount = _finalCountObj.Bulls;
			this.log.push({
				Guess: guess,
				Cows: _cowCount,
				Bulls: _bullCount
			});
			if (guess === _toBeGuessed) {
				console.log('Bingo! You have guessed ' + guess + ' correctly.');
				return;
			}
			console.log('Your guess ' + guess + ' contains ' + _cowCount + ' Cow' + (_cowCount===1?'':'s') + ' and ' + _bullCount + ' Bull' + (_bullCount===1?'':'s') + '.');
			return _finalCountObj;
		}
	}
};