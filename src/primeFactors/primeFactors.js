function primeFactor(input){
	var number = parseInt(input);
	if (isNaN(input))
		return { 
			number : input,
			error : "not a number" 
		};

	if (number <= 0)
		return{
			number : input,
			error : "not an integer > 1"
		}

	if (number > 1000000)
		return { 
			number : input,
			error : "too big number (>1e6)" 
		};

	return { 
		number: input,
		decomposition : getDecomposition(number)
	}; 
}

function getDecomposition(number){
	var quotien = number;
	var decomposition = [];
	
	var diviseur = 2;
	while(diviseur != quotien){
		if (quotien % diviseur == 0){
			decomposition.push(diviseur);
			quotien = quotien / diviseur;
		}else{
			diviseur++;
		}
	}
	decomposition.push(diviseur);

	return decomposition;
}

module.exports.primeFactors = function(input){
	if (!Array.isArray(input))
		return primeFactor(input);

	var results = [];
	for(var i in input){
		results.push(primeFactor(input[i]));
	}
	return results;
};