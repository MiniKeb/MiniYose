var expect = require('expect.js');
var run = require("../src/operations.js");

describe("primeFactors", function(){
	it("should return 'not a number' error with string parameter", function(){
		var result = run.primeFactors("hello");
		expect(result).to.have.property("error", "not a number");
	});

	it("should return [2,2,2,2] as decomposition of 16", function(){
		var result = run.primeFactors("16");
		expect(result).to.have.property("decomposition");
		expect(result.decomposition).to.be.eql([2, 2, 2, 2]);
	});

	it("should return [3,5] as decomposition of 15", function(){
		var result = run.primeFactors("15");
		expect(result).to.have.property("decomposition");
		expect(result.decomposition).to.be.eql([3, 5]);
	});

	it("should return [787] as decomposition of 787", function(){
		var result = run.primeFactors("787");
		expect(result).to.have.property("decomposition");
		expect(result.decomposition).to.be.eql([787]);
	});

	it("should return 'too big number (>1e6)' as decomposition of 1000001", function(){
		var result = run.primeFactors("1000001");
		expect(result).to.have.property("error", "too big number (>1e6)");
	});

	it("should return array of results as decomposition of [16, 15, Hello]", function(){
		var result = run.primeFactors(["16", "15", "Hello"]);
		expect(result).to.have.length(3);

		expect(result[0].decomposition).to.be.eql([2, 2, 2, 2]);
		expect(result[1].decomposition).to.be.eql([3, 5]);
		expect(result[2]).to.have.property("error", "not a number");

	})
});

describe("minesweeper", function(){
	it("should 8 rows with 8 cells", function(){
		var result = run.minesweeper();
		expect(result).to.have.length(8);
		expect(result[0]).to.have.length(8);
		expect(result[0][0]).to.be.eql("cell-1x1");
		expect(result[5][6]).to.be.eql("cell-6x7");
	});
});