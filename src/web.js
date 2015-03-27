// web.js
var express = require("express");
var viewEngine = require("express-handlebars");
var run = require(__dirname + "/operations.js");

var app = express();

app.engine("htm", viewEngine({defaultLayout: "layout", extname: "htm", layoutsDir: __dirname + "/views"}));
app.set("view engine", "htm");
app.set("views", __dirname + "/views");

app.get("/", function(request, response){ response.render("index"); });
app.get("/ping", function(request, response){ response.json({"alive" : true}); });
app.get("/primeFactors", function(request, response){ 
  var number = request.param("number");
  var result = run.primeFactors(number);
  response.json(result);
});
app.get("/primeFactors/ui", function(request, response){
  response.render("primeFactorsUi");
});

app.get("/minesweeper", function(request, response){
  var minesweeperData = { cells : run.minesweeper() };
  response.render("minesweeper", minesweeperData);
});
app.get("/astroport", function(request, response){
  response.render("astroport");
  response.setHeader("Content-Type", "text/html");
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
