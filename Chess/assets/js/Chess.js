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
				$('<td>').attr('class', String.fromCharCode(65 + j) + (8 - i)).append('<img src=""></img>').appendTo(row);
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
		_moveList.push({
			from: moveObj.from,
			to: moveObj.to,
			piece: moveObj.piece,
			capture: moveObj.capture
		});
		return true;
	};
	this.play = function() {
		var me = this;
		var _pick;
		var _place;
		var _move = {
			from: null,
			to: null,
			piece: null,
			capture: null
		};
		$('td', DOMNode).on('click', function() {
			var _srcLength = $('img', this).attr('src').length;
			if (_isPicked) {
				_place = this;
				_move.to = $(_place).attr('class');
				_move.piece = $('img', _pick).attr('src')[15];
				_move.capture = (_srcLength===0)?false:true;
				if (me.validateMove(_move)) {
					_isPicked = false;
					_pick.style.border = '';
					$('img', _place).attr('src', $('img', _pick).attr('src')).show();
					$('img', _pick).attr('src', '').hide();
				}
			} else if (!_isPicked && _srcLength !== 0) {
				_isPicked = true;
				_pick = this;
				_move.from = $(_pick).attr('class');
				_pick.style.border = '1px solid silver';
			}
		});
	};
	this.getMoves = function() {
		var _log = '';
		for (var i in _moveList) {
			var move = _moveList[i];
			if (i % 2 == 0) {
				_log += ((i / 2 + 1) + '.' + 'White ' + move.piece + ((move.capture===true)?' captures ':' moves ') + move.from + ' to ' + move.to + '...');
			} else {
				_log += ('Black ' + move.piece + ((move.capture===true)?' captures ':' moves ') + move.from + ' to ' + move.to + '</br>');
			}
		}
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