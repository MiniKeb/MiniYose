var express = require("express");
var router = express.Router();
var run = require(__dirname + "/minesweeper.js");

router.get("/", function(request, response){
  var minesweeperData = { cells : run.minesweeper() };
  response.render("minesweeper/views/minesweeper", minesweeperData);
});

module.exports = router;