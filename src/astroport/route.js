var express = require("express");
var router = express.Router();
//var run = require(__dirname + "/astroport.js");

router.get("/", function(request, response){
  response.render("astroport/views/astroport");
  response.setHeader("Content-Type", "text/html");
});

module.exports = router;