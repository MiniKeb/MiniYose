var expect = require('expect.js');
var run = require("../src/primeFactors/roman.js");

describe("romanToArabic", function(){
	it("should return 1 for I", function(){
		var number = run.romanToArabic("I");
		expect(number).to.be.eql(1);
	});
	it("should return 3 for III", function(){
		var number = run.romanToArabic("III");
		expect(number).to.be.eql(3);
	});
	it("should return 5 for V", function(){
		var number = run.romanToArabic("V");
		expect(number).to.be.eql(5);
	});
	it("should return 6 for VI", function(){
		var number = run.romanToArabic("VI");
		expect(number).to.be.eql(6);
	});
	it("should return 4 for IV", function(){
		var number = run.romanToArabic("IV");
		expect(number).to.be.eql(4);
	});
	it("should return 10 for X", function(){
		var number = run.romanToArabic("X");
		expect(number).to.be.eql(10);
	});
	it("should return 9 for IX", function(){
		var number = run.romanToArabic("IX");
		expect(number).to.be.eql(9);
	});
	it("should return 50 for L", function(){
		var number = run.romanToArabic("L");
		expect(number).to.be.eql(50);
	});
	it("should return 40 for XL", function(){
		var number = run.romanToArabic("XL");
		expect(number).to.be.eql(40);
	});
	it("should return 45 for XLV", function(){
		var number = run.romanToArabic("XLV");
		expect(number).to.be.eql(45);
	});
	it("should return 49 for XLIX", function(){
		var number = run.romanToArabic("XLIX");
		expect(number).to.be.eql(49);
	});
	it("should return 100 for C", function(){
		var number = run.romanToArabic("C");
		expect(number).to.be.eql(100);
	});
	it("should return 99 for XCIX", function(){
		var number = run.romanToArabic("XCIX");
		expect(number).to.be.eql(99);
	});
	it("should return 500 for D", function(){
		var number = run.romanToArabic("D");
		expect(number).to.be.eql(500);
	});
	it("should return 499 for CDXCIX", function(){
		var number = run.romanToArabic("CDXCIX");
		expect(number).to.be.eql(499);
	});
	it("should return error for IC", function(){
		expect(run.romanToArabic).withArgs("IC").to.throwException();
	});
});

describe("arabicToRoman", function(){
	it("should return I for 1", function(){
		var number = run.arabicToRoman(1);
		expect(number).to.be.eql("I");
	});
	it("should return III for 3", function(){
		var number = run.arabicToRoman(3);
		expect(number).to.be.eql("III");
	});
	it("should return V for 5", function(){
		var number = run.arabicToRoman(5);
		expect(number).to.be.eql("V");
	});
	it("should return IV for 4", function(){
		var number = run.arabicToRoman(4);
		expect(number).to.be.eql("IV");
	});	
	it("should return VI for 6", function(){
		var number = run.arabicToRoman(6);
		expect(number).to.be.eql("VI");
	});
	it("should return X for 10", function(){
		var number = run.arabicToRoman(10);
		expect(number).to.be.eql("X");
	});
	it("should return IX for 9", function(){
		var number = run.arabicToRoman(9);
		expect(number).to.be.eql("IX");
	});
	it("should return XI for 11", function(){
		var number = run.arabicToRoman(11);
		expect(number).to.be.eql("XI");
	});
	it("should return L for 50", function(){
		var number = run.arabicToRoman(50);
		expect(number).to.be.eql("L");
	});
	it("should return XL for 40", function(){
		var number = run.arabicToRoman(40);
		expect(number).to.be.eql("XL");
	});
	it("should return XLV for 45", function(){
		var number = run.arabicToRoman(45);
		expect(number).to.be.eql("XLV");
	});
	it("should return XLIX for 49", function(){
		var number = run.arabicToRoman(49);
		expect(number).to.be.eql("XLIX");
	});
	it("should return C for 100", function(){
		var number = run.arabicToRoman(100);
		expect(number).to.be.eql("C");
	});
	it("should return XCIC for 99", function(){
		var number = run.arabicToRoman(99);
		expect(number).to.be.eql("XCIX");
	});
	it("should return D for 500", function(){
		var number = run.arabicToRoman(500);
		expect(number).to.be.eql("D");
	});
	it("should return CDXCIX for 499", function(){
		var number = run.arabicToRoman(499);
		expect(number).to.be.eql("CDXCIX");
	});
	it("should return DCXCIX for 699", function(){
		var number = run.arabicToRoman(699);
		expect(number).to.be.eql("DCXCIX");
	});
});
