window.onload = load;

(function init(){
	var size = 8;
	var grid = [];
	for(var y = 0; y < size; y++){
		grid.push([]);
		for(var x = 0; x < size; x++){
			var cellValue = Math.random() < 0.15 ? 'bomb' : 'empty';
			grid[y].push(cellValue);
		}
	}

	document.grid = grid;
})();

function load(){
	var soluceGrid = getSoluceGrid(document.grid);
	var table = document.getElementById("minesweeper-table");
	table.onclick = function(event){
		gridClicked(event, table, soluceGrid);
	};
}

function gridClicked(event, table, soluce){
	event = event || window.event;
	var target = event.target || event.srcElement;

	while(target != table) { 
		if (target.nodeName == 'TD') { 
			cellClicked(target, soluce);
		}
    	target = target.parentNode;
  	}
}

function cellClicked(cell, soluce){
	console.log(soluce);
	reveal(cell, soluce);
}

function getPosition(cell){
	var currentPosition = cell.id.split("-")[1].split("x");
	var currentLineIndex = parseInt(currentPosition[0]) - 1;
	var currentCellIndex = parseInt(currentPosition[1]) - 1;

	return {
		x: currentCellIndex,
		y: currentLineIndex
	};
}

function getSoluceGrid(sourceGrid){
	var soluceGrid = [];

	for(var rowIndex in sourceGrid)
	{
		var lineIx = parseInt(rowIndex);
		soluceGrid.push([]);
		for(var cellIndex in sourceGrid[lineIx])
		{
			var cellIx = parseInt(cellIndex);
			var position = {
				y: lineIx,
				x: cellIx
			};

			soluceGrid[position.y].push(getSoluceValue(sourceGrid, position));
		}
	}

	return soluceGrid;
}

function getSoluceValue(grid, position){
	var gridSize = {
		width: grid[0].length,
		height: grid.length
	};

	if(grid[position.y][position.x] == "bomb")
		return "X";

	var value = 0;

	for(var y = -1; y <= 1; y++){
		for(var x = -1; x <= 1; x++){
			var isCurrent = (y == 0) && (x == 0);
			if (!isCurrent){
				var neighbourgLine = position.y + y;
				var neighbourgCell = position.x + x;

				var isInTable = neighbourgLine >= 0 
					&& neighbourgCell >= 0
					&& neighbourgLine < gridSize.height 
					&& neighbourgCell < gridSize.width;

				if(isInTable && grid[neighbourgLine][neighbourgCell] == "bomb"){
					value++;
				}
			}
		}
	}

	return value;
}


function getNeighbourgs(cellIx, lineIx, gridSize){
	var neighbourgs = [];

	for(var y = -1; y <= 1; y++){
		for(var x = -1; x <= 1; x++){
			var isCurrent = (y == 0) && (x == 0);
			if (!isCurrent){
				var neighbourgLine = lineIx + y;
				var neighbourgCell = cellIx + x;

				var isInTable = neighbourgLine >= 0 
					&& neighbourgCell >= 0
					&& neighbourgLine < gridSize.height 
					&& neighbourgCell < gridSize.width;

				if(isInTable){
					var neighbourg = getCell(neighbourgCell, neighbourgLine);
					neighbourgs.push(neighbourg);
				}
			}
		}
	}

	return neighbourgs;
}


function getCell(x, y){
	return document.getElementById("cell-"+ (y+1) +"x"+ (x+1));
}

function incrementValue(cell){
	var value = cell.getAttribute("data-value");
	if(value == null){
		value = "0"
	}
	if (value != "X"){
		cell.setAttribute("data-value", parseInt(value)+1);
	}
}

function reveal(cell, soluceGrid){
	var gridSize = {
		width: soluceGrid[0].length,
		height: soluceGrid.length
	};
	var position = getPosition(cell);
	var value = soluceGrid[position.y][position.x];
	if (value == "X"){
		var isSuspectMode = document.getElementById("suspect-mode").checked;
		if (isSuspectMode){
			cell.setAttribute("class", "suspect");
		} else {
			cell.setAttribute("class", "lost");
		}
	}else{
		cell.setAttribute("class", "safe");
		if(parseInt(value) > 0){
			cell.innerHTML = value;
		}else{
			cell.innerHTML = "";
			var position = getPosition(cell);
			var neighbourgs = getNeighbourgs(position.x, position.y, gridSize);
			for(var i = 0; i < neighbourgs.length; i++){
				var neighbourg = neighbourgs[i];
				var cssClass = neighbourg.getAttribute("class");
				if (!cssClass){
					reveal(neighbourg, soluceGrid);
				}
			}
		}
	}
}