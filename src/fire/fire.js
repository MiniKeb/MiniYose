module.exports.fireGeek = function(widthTxt, flatMap){
	var width = parseInt(widthTxt);
	var map = getMap(width, flatMap);

	var moves = [];
	var positions = getPositions(map);

	addMoves(moves, positions.plane, positions.water);
	addMoves(moves, positions.water, positions.fire);

	return {
		map: map,
		moves : moves
	}
}

function addMoves(moves, fromPos, toPos){
	var horizontalCount = toPos.y - fromPos.y;
	for(var y = 0; y < Math.abs(horizontalCount); y++){
		var step = horizontalCount < 0 ? -1 : 1;
		moves.push({dx:0, dy:step});
	}

	var verticalCount = toPos.x - fromPos.x;
	for(var x = 0; x < Math.abs(verticalCount); x++){
		var step = verticalCount < 0 ? -1 : 1;
		moves.push({dx:step, dy:0});
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