// web.js
var express = require("express");
var viewEngine = require("express-handlebars");
var app = express();

var routes = {
  primeFactors : require(__dirname + "/primeFactors/route.js"),
  minesweeper : require(__dirname + "/minesweeper/route.js"),
  astroport : require(__dirname + "/astroport/route.js"),
  fire: require(__dirname + "/fire/route.js")
}

app.engine("htm", viewEngine({defaultLayout: "layout", extname: "htm", layoutsDir: __dirname + "/views"}));
app.set("view engine", "htm");

app.set("views", __dirname);


app.get("/", function(request, response){ response.render("views/index"); });
app.get("/ping", function(request, response){ response.json({"alive" : true}); });

app.use("/primeFactors", routes.primeFactors);
app.use("/minesweeper", routes.minesweeper);
app.use("/astroport", routes.astroport);
app.use("/fire", routes.fire);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
