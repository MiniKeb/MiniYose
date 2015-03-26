var expect = require('expect.js');
var run = require("../src/operations.js");

describe("primeFactors", function(){
	it("should return 'not a number' error with string parameter", function(){
		var result = run.primeFactors("hello");
		expect(result).to.have.property("error", "not a number");
	});

	it("should return decomposed power of two number", function(){
		var result = run.primeFactors("16");
		expect(result).to.have.property("decomposition");
		expect(result.decomposition).to.be.eql([2, 2, 2, 2]);
	});
});