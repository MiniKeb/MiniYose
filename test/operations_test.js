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
});