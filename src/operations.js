module.exports.primeFactors = function (input){
  var result = {
    number: input
  };
  
  if (isNaN(result.number))
  {
    result.error = "not a number";
  }else{
    result.decomposition = [];
    var remain = result.number;
    while(remain > 1){
      remain = remain / 2;
      result.decomposition.push(2);
    }
  }
  return result;
}
