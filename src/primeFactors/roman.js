var Roman = function(romanChar, arabicValue, substractableToChars){
	this.romanChar = romanChar;
	this.arabicValue = arabicValue;
	this.substractableToChars = (substractableToChars == null) ? [] : substractableToChars;
};
Roman.prototype = {
	_canSubstractTo : function(romanChar){
		return this.substractableToChars.indexOf(romanChar) > -1;
	},
	getValue : function(nextRomanChar){
		if (nextRomanChar){
			var isSmallerThanNextValue = Romans[nextRomanChar].getValue() > this.arabicValue;
			var canSubstactToNext = this.substractableToChars.indexOf(nextRomanChar) > -1;
			
			if(isSmallerThanNextValue && !canSubstactToNext)
				throw "Invalid input";

			if(canSubstactToNext)
				return this.arabicValue * -1;
		}
		
		return this.arabicValue;
	}
};

var Romans = {
	'I' : new Roman('I', 1, ['V', 'X']),
	'V' : new Roman('V', 5),
	'X' : new Roman('X', 10, ['L', 'C']),
	'L' : new Roman('L', 50),
	'C' : new Roman('C', 100, ['D']),
	'D' : new Roman('D', 500)
};


module.exports.romanToArabic = function(romanNumber){
	var result = 0;
	
	for(var i = 0; i < romanNumber.length; i++){
		var roman = Romans[romanNumber[i]];
		result += roman.getValue(romanNumber[i+1]);
	}

	return result;
};

var Pair = function(number, letter){
	this.number = number;
	this.letter = letter;
};

var arabicForks = [
	{ from: new Pair(500, "D") },
	{ from: new Pair(100, "C"), except:new Pair(400, "CD") },
	{ from: new Pair(50, "L"), except:new Pair(90, "XC") },
	{ from: new Pair(10, "X"), except:new Pair(40, "XL") },
	{ from: new Pair(5, "V"), except:new Pair(9, "IX") },
	{ from: new Pair(1, "I"), except:new Pair(4, "IV") }
];

module.exports.arabicToRoman = function(arabicNumber){
	var result = '';
	var number = arabicNumber;

	for(var i = 0; i < arabicForks.length; i++){
		var current = arabicForks[i];
		while(number >= current.from.number){
			if(current.except != null && number >= current.except.number){
				result += current.except.letter;
				number -= current.except.number;
			}else{
				result += current.from.letter;
				number -= current.from.number;
			}
		}
	}

	return result;
}