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