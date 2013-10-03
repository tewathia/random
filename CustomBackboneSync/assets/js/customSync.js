
	var BookModel = Backbone.Model.extend({
		url: "a",
		initialize: function () {
			localStorage.clear();
			console.log('!book model initialized!');
		},
		defaults: {
			id: -1,
			title: 'no title yet',
			units: 10
		}
	});

	var myBook = new BookModel({
		id: 101,
		title: 'Theft of swords'
	});

	var yourBook = new BookModel({
		id: 102,
		title: 'The Inimitable Jeeves'
	});


    // myBook.save();



    Backbone.sync = customSync;


    function customSync (method, model) {
    	var _memory = JSON.parse(localStorage.getItem('modelMemory'))
    		,_count;

    	if (method == "update"){
    		console.log('!Save!');
    		if (_memory = undefined){
    			_memory = model;
    		}
    		else {
    			localStorage.setItem('modelMemory', JSON.stringify(model.attributes));
    		}
    		// closer();
    	}
    	else if (method == "read"){
    		// closer();
    		console.log('!Fetch!');
    		return _memory;
    	}
    	else if (method == "delete"){
    		// closer();
    		console.log('!Destroy!');
    		localStorage.removeItem('modelMemory');
    	}

    	// function closer() {
    	// 	if(_count == undefined){
    	// 		_count=1;
    	// 	}
    	// 	else{
    	// 	_count++;
    	// 	}
    	// 	console.log(_count++);
    	// }

    	// return closer();
    }

