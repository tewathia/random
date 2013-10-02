$(function () {
	"use strict";
	$('.draggable').bind('dragstart', function(event){
		$(this).css("border", "3px solid green" );
		event.dataTransfer.setData('numOrOp', this.id);

		// console.log(event.dataTransfer.getData('numOrOp'));
	});
	$('#firstNumSpan, #secondNumSpan, #operatorSpan').bind('dragenter', function(event){
		var $this = $(this);
		event.preventDefault();
		$this.css("background-color", 'rgba(100,100,100,0.5)');
	}).bind('dragleave', function(event){
		var $this = $(this);
		event.preventDefault();
		$this.css("background-color", 'white');
	}).bind('dragleave', function(event){
		console.log('1');
		event.preventDefault();
		var id = event.dataTransfer.getData('numOrOp');
		console.log(id);
		var dragObj = $('#'+id);
		var $this = $(this);
		if(this.id=="firstNumSpan" || this.id=="secondNumSpan"){
			if($('#'+id).hasClass('number')){
				$this.text(dragObj.attr('value')).addClass('dragDone');	
				$this.css("background-color", 'yellow');
				// printResult();
				if ($('.dragDone').length==3){
					$('#resultSpan').text(eval($('#firstNumSpan').text()+$('#operatorSpan').text()+$('#secondNumSpan').text()));
				}
				else{
					$('#resultSpan').text('Not Yet!');
				}

			}
		}
		else{
			if($('#'+id).hasClass('operator')){
				$this.text(dragObj.attr('value')).addClass('dragDone');	
				$this.css("background-color", 'yellow');
				// printResult();
				if ($('.dragDone').length==3){
					$('#resultSpan').text(eval($('#firstNumSpan').text()+$('#operatorSpan').text()+$('#secondNumSpan').text()));
				}
				else{
					$('#resultSpan').text('Not Yet!');
				}

			}
		}
	});	

// function printResult() {
// 	if ($('.dragDone').length==3){
// 		$('#resultSpan').text(eval($('#firstNumSpan').text()+$('#operatorSpan').text()+$('#secondNumSpan').text()));
// 	}
// 	else{
// 		$('#resultSpan').text('Not Yet!');
// 	}
}
});