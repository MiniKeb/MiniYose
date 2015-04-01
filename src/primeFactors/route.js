var express = require("express");
var router = express.Router();
var run = require(__dirname + "/primeFactors.js");

router.get("/", function(request, response){ 
  var number = request.param("number");
  var result = run.primeFactors(number);
  response.json(result);
});
router.get("/ui", function(request, response){
  response.render("primeFactors/views/primeFactorsUi");
});

module.exports = router;