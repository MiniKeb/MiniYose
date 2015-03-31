function primeFactor(input){
  var result = {
    number: input
  };
  
  if (isNaN(result.number))
  {
    result.error = "not a number";
  }
  else
  {
  	var quotien = parseInt(result.number);
  	if (quotien > 1000000)
  	{
  		result.error = "too big number (>1e6)";
  	}
  	else
  	{
	    result.decomposition = [];
	    
	    var diviseur = 2;
	    while(diviseur != quotien){
	    	if (quotien % diviseur == 0){
	    		result.decomposition.push(diviseur);
	    		quotien = quotien / diviseur;
	    	}else{
	    		diviseur++;
	    	}
	    }
	    result.decomposition.push(diviseur);
	}
  }
  return result; 
}

module.exports.primeFactors = function(input){
	if (!Array.isArray(input))
		return primeFactor(input);

	var results = [];
	for(var i in input){
		results.push(primeFactor(input[i]));
	}
	return results;
};

module.exports.minesweeper = function(){
	var table = [];
	for(var row = 1; row <= 8; row++){
		rows = [];
		for (var cell = 1; cell <= 8; cell++)
		{
			var id = "cell-"+ row +"x"+ cell;
			rows.push(id);
		}
		
		table.push(rows);
	}

	return table;
};

module.exports.fireGeek = function(widthTxt, flatMap){
	var width = parseInt(widthTxt);
	var map = getMap(width, flatMap);

	var moves = [];
	var positions = getPositions(map);

	var firstStepNumberDy = positions.water.y - positions.plane.y;
	for(var y = 0; y < firstStepNumberDy; y++){
		moves.push({dx:0, dy:1});
	}

	var firstStepNumberDx = positions.water.x - positions.plane.x;
	for(var x = 0; x < firstStepNumberDx; x++){
		moves.push({dx:1, dy:0});
	}

	var secondStepNumberDy = positions.fire.y - positions.water.y;
	for(var y = 0; y < secondStepNumberDy; y++){
		moves.push({dx:0, dy:1});
	}
	
	var secondStepNumberDx = positions.fire.x - positions.water.x;
	for(var x = 0; x < secondStepNumberDx; x++){
		moves.push({dx:1, dy:0});
	}

	return {
		map: map,
		moves : moves
	}
}

function getMap(width, flatMap)
{
	var map = [];
	var i = 0;

	while(i * width < flatMap.length)
	{
		map.push(flatMap.substr(i * width, width));
		i++;
	}

	return map;
}

function getPositions(map)
{
	var positions = {};
	for(var y = 0; y < map.length; y++)
	{
		for(var x = 0; x < map[y].length; x++)
		{
			var sign = map[y][x];
			switch(sign)
			{
				case "P" : positions.plane = {x : x, y: y};
					break;
				case "W" : positions.water = {x : x, y: y};
					break;
				case "F" : positions.fire = {x : x, y: y};
					break;
				default:
					break;
			}
		}
	}
	return positions;
}