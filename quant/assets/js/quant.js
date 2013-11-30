var quant = {
	factors: function(n) {
		var factors = [];
		for (var i = 0; i <= n / 2; i++) {
			if (n % i === 0) {
				factors.push(i);
			}
		}
		factors.push(n);
		return factors;
	},


	tripletsCount: function(n) {
		var count = 0;
		var factorsList = this.factors(n);
		oneCount = 0;
		var f = 2310 / 2;
		for (var i = 1; i <= f; i++) {
			for (var j = i; j <= f; j++) {
				for (var k = j; k <= f; k++) {
					if (i * j * k === n) {
						count += 1;
						console.log(i, j, k, i * j * k);
						if (i == 1) {
							oneCount += 1;
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
		if (!isArray) {
			for (var i in args) {
				_array.push(args[i]);
			}
		} else {
			_array = args[0];
		}
		this.pickWinner = function() {
			if (_array.length > 0) {
				var _winnerIndex = Math.floor(Math.random() * (_array.length));
				var _winner = _array.splice(_winnerIndex, 1);
				return _winner;
			} else {
				throw new Error('No More Winners can be picked!');
			}
		};
		this.addParticipant = function(name) {
			_array.push(name);
		};
	},

	CowsAndBulls: function(num) {
		var n = ((num < 10) && (num > 0)) ? num : 4;
		var _generateRandomNumber = function(n) {
			var _numArr = [];
			var _finalNum = 0;
			for (var i = 1; i < 10; i++) {
				_numArr.push(i);
			}
			for (var j = 0; j < n; j++) {
				var _index = Math.floor(Math.random() * _numArr.length);
				_finalNum += _numArr[_index] * Math.pow(10, j);
				_numArr.splice(_index, 1);
			}
			return _finalNum;
		};
		var _toBeGuessed = _generateRandomNumber(n);

		this.giveUp = function() {
			console.log('The Number was ' + _toBeGuessed);
			return _toBeGuessed;
		};

		this.log = [],

		this.isIt = function(guess) {
			var _getCount = function(string) {
				var _countObj = {};
				var _guessString = guess + '';
				var _toBeGuessedString = _toBeGuessed + '';
				var _cows = 0;
				var _bulls = 0;
				var _checkGuessFormat = function(val) {
					var _isProper = false;
					var _indexSum = 0;
					var _expectedIndexSum = (9 - val) * (-1) + val * (val - 1) / 2;
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
			console.log('Your guess ' + guess + ' contains ' + _cowCount + ' Cow' + (_cowCount === 1 ? '' : 's') + ' and ' + _bullCount + ' Bull' + (_bullCount === 1 ? '' : 's') + '.');
			return _finalCountObj;
		}
	},

	Sudoku: function(ProblemArray) {
		var problem = [];
		this.fillerArray = [];
		for (var rowInput in ProblemArray) {
			var row = [];
			var rowArray = ProblemArray[rowInput];
			for (var cellInput in rowArray) {
				var cell = rowArray[cellInput]
				var cellObj = {
					value: cell,
					state: (cell === 0 ? 'Blank' : 'Given')
				};
				row.push(cellObj);
				// console.log(cellObj);
			}
			problem.push(row);
		}
		this.checkSolution = function(sudoku) {
			var _isCorrect = true;
			var _sum;
			var _checkRow = function(row) {
				_sum = 0;
				for (var i in sudoku[row]) {
					_sum += sudoku[row][i].value;
				}
				if (_sum !== 45) {
					_isCorrect = false;
				}
			};
			var _checkColumn = function(column) {
				_sum = 0;
				for (var i in sudoku) {
					_sum += sudoku[i][column].value;
				}
				if (_sum !== 45) {
					_isCorrect = false;
				}
			};
			var _checkBox = function(box) {
				var x = (box % 3) * 3,
					y = (Math.floor(box / 3)) * 3;
				_sum = 0;
				for (var i = x; i < x + 3; i++) {
					for (var j = y; j < y + 3; j++) {
						_sum += sudoku[i][j].value;
					}
				}
				if (_sum !== 45) {
					_isCorrect = false;
				}
			};

			for (var i = 0; i < 9; i++) {
				_checkRow(i);
				_checkColumn(i);
				_checkBox(i);
			}

			return _isCorrect;
		}

		this.id = Math.floor(Math.random() * 1000);

		this.show = function() {
			if ($('.sudokuTable' + this.id).length > 0) {
				this.remove();
			}
			var formattedSudoku = '';
			for (var row in problem) {
				formattedSudoku += '<tr>';
				for (var cell in problem[row]) {
					var cellObj = problem[row][cell];
					formattedSudoku += '<td class="' + cellObj.state + '">' + cellObj.value + '</td>';
				}
				formattedSudoku += '</tr>';
			}
			var table = $('<table>').attr('class', 'sudokuTable' + this.id).html(formattedSudoku);
			table.appendTo($('body'));
			return problem;
		}

		this.remove = function() {
			$('.sudokuTable' + this.id).remove();
		}

		this.iterations = 0;
		this.stackCount = 0;

		this.solve = function() {
			this.iterations++;
			var attempt = problem;
			if (!this.fillerArray.length) {
				console.log('empty');
				for (var row in attempt) {
					row = attempt[row];
					var _remArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
					for (var i in row) {
						var cell = row[i];
						if (cell.state === 'Given') {
							_remArr.splice(_remArr.indexOf(cell.value), 1);
						}
					}
					this.fillerArray.push(_remArr);
				}
			}
			var fillerArray = [];
			for (var i in this.fillerArray) {
				fillerArray[i] = this.fillerArray[i].slice(0);
			}
			var _fillRow = function(row, index) {
				var _remArr = fillerArray[index];
				// console.log(_remArr);
				for (var i in row) {
					var cell = row[i];
					if (cell.state !== 'Given') {
						cell.state = 'Solved';
						var _index = Math.floor(Math.random() * _remArr.length);
						cell.value = _remArr[_index];
						_remArr.splice(_index, 1);
					}
				}
			}
			for (var i in attempt) {
				// console.log(i, 'attempt');
				_fillRow(attempt[i], i);
				// console.log(attempt[i]);
			}
			var isSolved = this.checkSolution(attempt);
			// console.log(isSolved); 
			if (isSolved) {
				var solution = attempt;
				this.show();
				console.log('!Solved!', 'stack', this.stackCount, 'iterations', this.iterations + this.stackCount * 9630, solution);
				this.iterations = 0;
				this.stackCount = 0;
			} else {
				// console.log('!Not Solved');
				if (this.iterations === 9630) {
					var that = this;
					setTimeout(function() {
						that.show();
						that.iterations = 0;
						that.stackCount++;
						that.solve();
					}, 1);
				} else {
					this.solve();
				}
			}
		}
		this.show();
	},

	luhn: function(n) {
		var n = (n + '').split('');
		var checksum = 0;
		for (var i = 0; i < n.length; i++) {
			var c = n.length - 1 - i;
			checksum += (n[i] == 9) ? 9 : ((n[i] * (1 + c % 2)) % 9);
		}
		return (checksum % 10 === 0);
	}
};
