var express = require("express");
var router = express.Router();
var run = require(__dirname + "/primeFactors.js");

router.get("/", function(request, response){ 
    var number = request.param("number");
    var result = run.primeFactors(number);
    response.json(result);
});
router.get("/ui", function(request, response){
  	var number = request.param("number");
  	var result = null;
  	if (number !== undefined){
  		var primeFactor = run.primeFactors(number);
        if(primeFactor.error){
            result = (number > 1000000) 
                ? primeFactor.error
                : primeFactor.number +" is "+ primeFactor.error;
        }else{
      		result = primeFactor.number +" = "+ primeFactor.decomposition.join(" x ");
        }
  	}

    response.render("primeFactors/views/primeFactorsUi", {result: result});
});

module.exports = router;