// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  var html = '<html><head></head><body>Hello Yose <a id="repository-link" href="https://github.com/MiniKeb/MiniYose">Repository</a> <a id="contact-me-link" href="#">Contact Me</a> <a id="ping-challenge-link" href="/ping">Ping Me</a> </body></html>';
  res.send(html);
});

app.get('/ping', function(request, response){
  response.contentType("application/json");
  response.send('{ "alive" : true }')
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
