module.exports.fireGeek = function(widthTxt, flatMap){
	var width = parseInt(widthTxt);
	var map = getMap(width, flatMap);

	var positions = getPositions(map);

	// Ok, that's odd but I need a clone and I don't wanna go all over several times.
	var grids = buildGrids(width, flatMap);

	var best = positions.water[0];
	var bestScore = calculateScore(positions.plane, best)
	for(var w = 0; w < positions.water; w++){
		var score = calculateScore(positions.plane, positions.water[w]);
		if(bestScore > score){
			best = positions.water[w];
			bestScore = score;
		}
	}

	var moves = getTakeWater(grids[0], positions.plane, best);
	if(positions.fire)
	{
		moves = moves.concat(getExtinguishFire(grids[1], best, positions.fire));
	}

	return {
		map: map,
		moves : moves
	}
}

function buildGrids(width, flatMap){
	var grids = [];

	for(var i = 0; i < 2; i++){
		var grid = [];
		var y = 0;

		while(y * width < flatMap.length){
			grid.push([]);
			grid[y] = [];

			for(var x = 0; x < width; x++){
				var node = {
					parent: null,
					value : flatMap[(y * width) + x],
					position : {x: x, y: y},
					isVisited : false,

					isFire : function(){ return this.value == "F" }
				}
				grid[y].push(node);
			}

			y++;
		}
		
		grids.push(grid);
	}
	return grids;
}

function getTakeWater(map, startPos, endPos){
	var currentNode = map[startPos.y][startPos.x];
	currentNode.isVisited = true;

	while(!isSamePosition(currentNode.position, endPos)){
		var bestNeighbourg = {
			node: null,
			score: 0
		};

		var neighbourgs = getNeighbourgs(map, currentNode.position);
		for(var i = 0; i < neighbourgs.length; i++){
			var node = neighbourgs[i];
			if(!node.isFire() && !node.isVisited){
				var score = calculateScore(node.position, endPos);
				if(bestNeighbourg.node == null || bestNeighbourg.score > score){
					bestNeighbourg.node = node;
					bestNeighbourg.score = score;
				}
				node.isVisited = true;
			}
		}

		bestNeighbourg.node.parent = currentNode;
		currentNode = bestNeighbourg.node;
	}

	var moves = [];
	var prevPosition = null;

	while(currentNode.parent != null){
		if(prevPosition != null){
			moves.push({
				dx: prevPosition.x - currentNode.position.x,
				dy: prevPosition.y - currentNode.position.y
			});
		}
		prevPosition = currentNode.position;
		currentNode = currentNode.parent;
	}

	moves.push({
		dx: prevPosition.x - currentNode.position.x,
		dy: prevPosition.y - currentNode.position.y
	});

	return reverse(moves);
}

function getExtinguishFire(map, startPos, endPos){
	var currentNode = map[startPos.y][startPos.x];
	currentNode.isVisited = true;

	while(!isSamePosition(currentNode.position, endPos)){
		var bestNeighbourg = {
			node: null,
			score: 0
		};

		var neighbourgs = getNeighbourgs(map, currentNode.position);
		for(var i = 0; i < neighbourgs.length; i++){
			var node = neighbourgs[i];
			if(!node.isVisited){
				var score = calculateScore(node.position, endPos);
				if(bestNeighbourg.node == null || bestNeighbourg.score > score){
					bestNeighbourg.node = node;
					bestNeighbourg.score = score;
				}
				node.isVisited = true;
			}
		}

		bestNeighbourg.node.parent = currentNode;
		currentNode = bestNeighbourg.node;
	}

	var moves = [];
	var prevPosition = null;

	while(currentNode.parent != null){
		if(prevPosition != null){
			moves.push({
				dx: prevPosition.x - currentNode.position.x,
				dy: prevPosition.y - currentNode.position.y
			});
		}
		prevPosition = currentNode.position;
		currentNode = currentNode.parent;
	}

	moves.push({
		dx: prevPosition.x - currentNode.position.x,
		dy: prevPosition.y - currentNode.position.y
	});

	return reverse(moves);
}

function reverse(array){
	var reversed = [];
	for(var i = array.length - 1; i >= 0; i--){
		reversed.push(array[i]);
	}
	return reversed;
}

function getNeighbourgs(map, position, rejectFunc){
	var neighbourgs = [];
	
	var north = map[position.y-1] != undefined ? map[position.y-1][position.x] : undefined;
	if(north)
		neighbourgs.push(north);

	var east = map[position.y][position.x+1];
	if (east)
		neighbourgs.push(east);

	var south = map[position.y+1] != undefined ? map[position.y+1][position.x] : undefined;
	if (south)
		neighbourgs.push(south);

	var west = map[position.y][position.x-1];
	if (west)
		neighbourgs.push(west);

	return neighbourgs;
}

function calculateScore(firstPos, secondPos){
	return Math.abs(firstPos.x - secondPos.x) + Math.abs(firstPos.y - secondPos.y);
}

function isSamePosition(firstPos, secondPos){
	return firstPos.x == secondPos.x && firstPos.y == secondPos.y;
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
	var positions = {
		plane: undefined,
		water: [],
		fire: undefined
	};
	for(var y = 0; y < map.length; y++)
	{
		for(var x = 0; x < map[y].length; x++)
		{
			var sign = map[y][x];
			switch(sign)
			{
				case "P" : positions.plane = {x : x, y: y};
					break;
				case "W" : positions.water.push({x : x, y: y});
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