var roman = require("./roman.js");

function primeFactor(input){
	var number = parseInt(input);
	var isRoman = false;
	if (isNaN(input)){
		try{
			number = roman.romanToArabic(input);
			isRoman = true;
		}catch (e){
			return { 
				number : input,
				error : "not a number" 
			};
		}
	}

	if (number <= 0){
		return{
			number : input,
			error : "not an integer > 1"
		}
	}

	if (number > 1000000){
		return { 
			number : input,
			error : "too big number (>1e6)" 
		};
	}

	return { 
		number: input,
		decomposition : getDecomposition(number, isRoman)
	}; 
}

function getDecomposition(number, isRoman){
	var quotien = number;
	var decomposition = [];
	
	var diviseur = 2;
	while(diviseur != quotien){
		if (quotien % diviseur == 0){
			decomposition.push(isRoman ? roman.arabicToRoman(diviseur) : diviseur);
			quotien = quotien / diviseur;
		}else{
			diviseur++;
		}
	}

	decomposition.push(isRoman ? roman.arabicToRoman(diviseur) : diviseur);

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