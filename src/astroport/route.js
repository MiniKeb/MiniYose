var express = require("express");
var router = express.Router();
//var run = require(__dirname + "/astroport.js");

router.get("/", function(request, response){
	var shipname = request.param("ship");
	var ship = "";
	if(shipname !== undefined)
		ship = shipname;
	response.render("astroport/views/astroport", {ship: ship});
	response.setHeader("Content-Type", "text/html");
});

module.exports = router;