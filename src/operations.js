module.exports.primeFactors = function (input){
  var result = {
    number: input
  };
  
  if (isNaN(result.number))
  {
    result.error = "not a number";
  }else{
    result.decomposition = [];
    var quotien = parseInt(result.number);
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
  return result; 
}
