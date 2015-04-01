var express = require("express");
var router = express.Router();
var run = require(__dirname + "/fire.js");

router.get("/geek", function(request, response){
  var width = request.param("width");
  var map = request.param("map");
  var result = run.fireGeek(width, map);
  response.json(result);
});

module.exports = router;