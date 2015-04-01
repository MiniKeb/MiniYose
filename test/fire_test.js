var expect = require('expect.js');
var run = require("../src/fire/fire.js");

describe("fireGeek", function(){
	it("should return a map of size 3", function(){
		var result = run.fireGeek("3", "...P...WF");

		expect(result).to.have.property("map");
		expect(result.map).to.have.length(3);
		expect(result.map[0]).to.be.eql("...");
		expect(result.map[1]).to.be.eql("P..");
		expect(result.map[2]).to.be.eql(".WF");
	});

	it("should return a plane's move to take water and put it on fire", function(){
		var result = run.fireGeek("3", "...P...WF");

		expect(result).to.have.property("moves");
		expect(result.moves).to.have.length(3);
		
		expect(result.moves[0]).to.be.eql({dx: 0, dy: 1});
		expect(result.moves[1]).to.be.eql({dx: 1, dy: 0});
		expect(result.moves[2]).to.be.eql({dx: 1, dy: 0});
	});
});


/*
{
    map: [
        "...",
	"P..",
	".WF"
    ],
    moves: [
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: 0 },
    ]
}
*/