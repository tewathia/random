function Chess() {
	var DOMNode = document.body;
	var _isPicked = false;
	var _moveList = [];
	this.makeBoard = function(DOMNode) {
		DOMNode = DOMNode || {};
		var board = $('<table>');
		var row;
		for (var i = 0; i < 8; i++) {
			row = $('<tr>');
			for (var j = 0; j < 8; j++) {
				$('<td>').attr('class', String.fromCharCode(65 + j) + (8 - i)).append('<img draggable="true" src=""></img>').appendTo(row);
			}
			board.append(row);
		}
		board.appendTo($(DOMNode));
	};
	this.populate = function() {
		$('tr:nth-of-type(2)>td>img').each(function(index, element) {
			$(element).attr('src', 'assets/images/BP.ico').show();
		});
		$('tr:nth-of-type(7)>td>img').each(function(index, element) {
			$(element).attr('src', 'assets/images/WP.ico').show();
		});
		$('tr:nth-of-type(1)>td').each(function(index, element) {
			if (index === 0 || index === 7) {
				$('img', element).attr('src', 'assets/images/BR.ico').show();
			} else if (index === 1 || index === 6) {
				$('img', element).attr('src', 'assets/images/BN.ico').show();
			} else if (index === 2 || index === 5) {
				$('img', element).attr('src', 'assets/images/BB.ico').show();
			} else if (index === 3) {
				$('img', element).attr('src', 'assets/images/BQ.ico').show();
			} else {
				$('img', element).attr('src', 'assets/images/BK.ico').show();
			}
		});
		$('tr:nth-of-type(8)>td').each(function(index, element) {
			if (index === 0 || index === 7) {
				$('img', element).attr('src', 'assets/images/WR.ico').show();
			} else if (index === 1 || index === 6) {
				$('img', element).attr('src', 'assets/images/WN.ico').show();
			} else if (index === 2 || index === 5) {
				$('img', element).attr('src', 'assets/images/WB.ico').show();
			} else if (index === 3) {
				$('img', element).attr('src', 'assets/images/WQ.ico').show();
			} else {
				$('img', element).attr('src', 'assets/images/WK.ico').show();
			}
		});
		$('tr:nth-of-type(3)>td, tr:nth-of-type(4)>td, tr:nth-of-type(5)>td, tr:nth-of-type(6)>td').each(function(index, element) {
			$('img', element).attr('src', '').hide();
		});
	};
	this.depopulate = function() {
		$('td').each(function(index, element) {
			$('img', element).attr('src', '').hide();
		});
	};
	this.show = function() {
		$('table', DOMNode).show();
	};
	this.hide = function() {
		$('table', DOMNode).hide();
	};
	this.validateMove = function(moveObj) {
		return true;
	};
	this.play = function() {
		var me = this,
			_pick,
			_place,
			_move = {
				from: null,
				to: null,
				piece: null,
				capture: null
			};

		function click() {
			var _srcLength = $('img', this).attr('src').length;
			if (_isPicked) {
				_place = this;
				_move.to = $(_place).attr('class');
				_move.piece = $('img', _pick).attr('src')[15];
				_move.capture = (_srcLength === 0) ? false : true;
				_move.color = $('img', _pick).attr('src')[14];
				if (me.validateMove(_move)) {
					_isPicked = false;
					_pick.style.backgroundColor = '';
					$('img', _place).attr('src', $('img', _pick).attr('src')).show();
					if (_place !== _pick) {
						_moveList.push({
							from: _move.from,
							to: _move.to,
							piece: _move.piece,
							color: _move.color,
							capture: _move.capture
						});
						$('img', _pick).attr('src', '').hide();
						me.getMoves();
					}
				}
			} else if (!_isPicked && _srcLength !== 0) {
				_isPicked = true;
				_pick = this;
				_move.from = $(_pick).attr('class');
				_pick.style.backgroundColor = 'silver';
			}
		}
		$('td', DOMNode).on('click', click);
		$('td', DOMNode).on('dragstart', function(event) {
			var _srcLength = $('img', this).attr('src').length;
			if (!_isPicked && _srcLength !== 0) {
				_isPicked = true;
				_pick = this;
				_move.from = $(_pick).attr('class');
				_pick.style.backgroundColor = 'silver';
			}
		}).on('dragover', function(event) {
			event.preventDefault();
			$(this).attr('style', 'background-color:silver');
		}).on('dragleave', function(event) {
			event.preventDefault();
			$(this).attr('style', '');
		}).on('drop', function(event) {
			$(this).attr('style', '');
			var _srcLength = $('img', this).attr('src').length;
			if (_isPicked) {
				_place = this;
				_move.to = $(_place).attr('class');
				_move.piece = $('img', _pick).attr('src')[15];
				_move.capture = (_srcLength === 0) ? false : true;
				_move.color = $('img', _pick).attr('src')[14];
				if (me.validateMove(_move)) {
					_isPicked = false;
					_pick.style.backgroundColor = '';
					$('img', _place).attr('src', $('img', _pick).attr('src')).show();
					if (_place !== _pick) {
						_moveList.push({
							from: _move.from,
							to: _move.to,
							piece: _move.piece,
							color: _move.color,
							capture: _move.capture
						});
						$('img', _pick).attr('src', '').hide();
						me.getMoves();
					}
				}
			}
		});
	};
	this.getMoves = function() {
		var _log = '';
		for (var i in _moveList) {
			var move = _moveList[i];
			if (i % 2 == 0) {
				_log += ((i / 2 + 1) + '.' + ((move.color === 'W') ? 'White ' : 'Black ') + move.piece + ((move.capture === true) ? ' captures ' : ' moves ') + move.from + ' to ' + move.to + '...');
			} else {
				_log += (((move.color === 'W') ? 'White ' : 'Black ') + move.piece + ((move.capture === true) ? ' captures ' : ' moves ') + move.from + ' to ' + move.to + '</br>');
			}
		}
		$('.moves').remove();
		$('<span>').addClass('moves').html(_log).appendTo(DOMNode);
		return {
			objects: _moveList,
			notation: _log
		};
	};
	this.initialize = function() {
		this.makeBoard(document.body);
		this.show();
		this.populate();
		this.play();
	};
}
c = new Chess();