module.exports.fireGeek = function(widthTxt, flatMap){
	var width = parseInt(widthTxt);

	var data = new CombineVisitor();
	visitFlatMap(flatMap, width, data);

	var positions = data.getPositions();

	var best = getBestWaterPosition(positions);
	var moves = getPath(data.getWaterGrid(), positions.plane, best, "F");
	if(positions.fire)
	{
		moves = moves.concat(getPath(data.getFireGrid(), best, positions.fire));
	}

	return {
		map: data.getMap(),
		moves : moves
	}
}

var CombineVisitor = function(){
	this.map = new MapVisitor();
	this.positions = new PositionsVisitor();
	this.waterGrid = new GridVisitor();
	this.fireGrid = new GridVisitor();

	this.visitors = [this.map, this.positions, this.waterGrid, this.fireGrid];
};
CombineVisitor.prototype = {
	visit: function(value, line, row){
		for(var v = 0; v < this.visitors.length; v++){
			this.visitors[v].visit(value, line, row);
		}
	}, 
	getMap: function(){ return this.map.map; },
	getPositions: function(){ return this.positions.positions; },
	getWaterGrid: function(){ return this.waterGrid.grid; },
	getFireGrid: function(){ return this.fireGrid.grid; }
}

var MapVisitor = function(){
	this.map = [];
};
MapVisitor.prototype = {
	visit: function(value, line, row){
		if(!this.map[line])
			this.map.push("");

		this.map[line] = this.map[line] + value;
	}
};

var PositionsVisitor = function(){
	this.positions = {
		plane: undefined,
		waters: [],
		fire: undefined
	};
};
PositionsVisitor.prototype = {
	visit: function(value, line, row){
		var sign = value;
		switch(sign)
		{
			case "P" : this.positions.plane = {x: row, y: line};
				break;
			case "W" : this.positions.waters.push({x: row, y: line});
				break;
			case "F" : this.positions.fire = {x: row, y: line};
				break;
			default:
				break;
		}
	}
};

var GridVisitor = function(){
	this.grid = [];
};
GridVisitor.prototype = {
	visit: function(value, line, row){
		if(!this.grid[line]){
			this.grid.push([]);
			this.grid[line] = [];
		}

		var node = {
			parent: null,
			value : value,
			position : {x: row, y: line},
			isVisited : false
		}
		this.grid[line].push(node);
	}	
};

function visitFlatMap(flatMap, width, visitor){
	var line = 0;
	while(line * width < flatMap.length){
		for(var row = 0; row < width; row++){
			var value = flatMap[(line * width) + row];
			visitor.visit(value, line, row);
		}
		line++;
	}
}

function getBestWaterPosition(positions){
	var best = positions.waters[0];
	var bestScore = calculateScore(positions.plane, best);
	if(positions.fire)
		bestScore += calculateScore(best, positions.fire);

	for(var w = 0; w < positions.waters.length; w++){
		var score = calculateScore(positions.plane, positions.waters[w]);
		if(positions.fire)
			score += calculateScore(positions.waters[w], positions.fire);
		
		if(bestScore > score){
			best = positions.waters[w];
			bestScore = score;
		}
	}

	return best;
}

function getPath(map, startPos, endPos, cellToAvoid){
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
			var canPass = !cellToAvoid || (node.value != cellToAvoid)
			if(!node.isVisited && canPass){
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

function reverse(array){
	var reversed = [];
	for(var i = array.length - 1; i >= 0; i--){
		reversed.push(array[i]);
	}
	return reversed;
}









