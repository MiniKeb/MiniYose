var expect = require('expect.js');
var run = require("../src/fire/fire.js");

describe("fireGeek", function(){
	it("should return a map of size 3", function(){
		var result = run.fireGeek("3", "...P...WF");

		expect(result).to.have.property("map");
		expect(result.map).to.have.length(3);
		expect(result.map[0]).to.be.eql('...');
		expect(result.map[1]).to.be.eql('P..');
		expect(result.map[2]).to.be.eql('.WF');
	});

	it("plane should move to water and put it on fire", function(){
		var result = run.fireGeek("3", "...P...WF");

		expect(result).to.have.property("moves");
		expect(result.moves).to.have.length(3);
		
		expect(result.moves[0]).to.be.eql({dx: 1, dy: 0});
		expect(result.moves[1]).to.be.eql({dx: 0, dy: 1});
		expect(result.moves[2]).to.be.eql({dx: 1, dy: 0});
	});

	it("plane should move back to water and put it on fire", function(){
		var result = run.fireGeek("3", "......WPF");

		expect(result).to.have.property("moves");
		expect(result.moves).to.have.length(3);
		
		expect(result.moves[0]).to.be.eql({dx: -1, dy: 0});
		expect(result.moves[1]).to.be.eql({dx: 1, dy: 0});
		expect(result.moves[2]).to.be.eql({dx: 1, dy: 0});
	});

	it("plane shouldn't move to fire before water", function(){
		var result = run.fireGeek("3", "......PFW");

		expect(result).to.have.property("moves");
		expect(result.moves).to.have.length(5);

		expect(result.moves[0]).to.be.eql({dx: 0, dy: -1});
		expect(result.moves[1]).to.be.eql({dx: 1, dy: 0});
		expect(result.moves[2]).to.be.eql({dx: 1, dy: 0});
		expect(result.moves[3]).to.be.eql({dx: 0, dy: 1});
		expect(result.moves[4]).to.be.eql({dx: -1, dy: 0});
	});

	it("plane should move to closest water even if there is no fire", function(){
		var result = run.fireGeek("5", "W..P......W....");

		expect(result).to.have.property("moves");
		expect(result.moves).to.have.length(3);


		expect(result.moves[0]).to.be.eql({dx: -1, dy: 0});
		expect(result.moves[1]).to.be.eql({dx: -1, dy: 0});
		expect(result.moves[2]).to.be.eql({dx: -1, dy: 0});
	});

	it("plane should take the best path", function(){
		var result = run.fireGeek("5", "W...PF........W");

		expect(result).to.have.property("moves");
		expect(result.moves).to.have.length(5);


		expect(result.moves[0]).to.be.eql({dx: -1, dy: 0});
		expect(result.moves[1]).to.be.eql({dx: -1, dy: 0});
		expect(result.moves[2]).to.be.eql({dx: -1, dy: 0});
		expect(result.moves[3]).to.be.eql({dx: -1, dy: 0});
		expect(result.moves[4]).to.be.eql({dx: 0, dy: 1});
	});

	it("plane should take the best path", function(){
		var result = run.fireGeek("11", ".............W..P...W........F...");

		expect(result).to.have.property("moves");
		expect(result.moves).to.have.length(7);
	});
});
