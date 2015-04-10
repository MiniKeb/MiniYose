var expect = require('expect.js');
var run = require("../src/minesweeper/minesweeper.js");
var cli = require("../src/assets/minesweeper.js");

describe("minesweeper", function(){
	it("should 8 rows with 8 cells", function(){
		var result = run.minesweeper();
		expect(result).to.have.length(8);
		expect(result[0]).to.have.length(8);
		expect(result[0][0]).to.be.eql("cell-1x1");
		expect(result[5][6]).to.be.eql("cell-6x7");
	});

	
});