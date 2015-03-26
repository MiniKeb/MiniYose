// web.js
var express = require("express");
var mustacheExpress = require("mustache-express");
var run = require(__dirname + "\\operations.js");

var app = express();

app.engine("htm", mustacheExpress());
app.set("view engine", "htm");
app.set("views", __dirname + "\\views");

app.get("/", function(request, response){ response.render("index"); });
app.get("/ping", function(request, response){ response.json({"alive" : true}); });
app.get("/primeFactors", function(request, response){ 
  var number = request.param("number");
  var result = run.primeFactors(number);
  response.json(result);
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
