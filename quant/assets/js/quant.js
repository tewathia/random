var quant = {


	factors : function (n){
		var factors = new Array();
		for (var i = 0; i <= n/2; i++){
			if (n%i==0){
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
						};
					}
				}

			}

		}
		return count;
	}

}
