function primeFactor(input){
  var result = {
    number: input
  };
  
  if (isNaN(result.number))
  {
    result.error = "not a number";
  }
  else
  {
  	var quotien = parseInt(result.number);
  	if (quotien > 1000000)
  	{
  		result.error = "too big number (>1e6)";
  	}
  	else
  	{
	    result.decomposition = [];
	    
	    var diviseur = 2;
	    while(diviseur != quotien){
	    	if (quotien % diviseur == 0){
	    		result.decomposition.push(diviseur);
	    		quotien = quotien / diviseur;
	    	}else{
	    		diviseur++;
	    	}
	    }
	    result.decomposition.push(diviseur);
	}
  }
  return result; 
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