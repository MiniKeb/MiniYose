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
	for(var rowIndex in document.grid)
	{
		var lineIx = parseInt(rowIndex);
		for(var cellIndex in document.grid[lineIx])
		{
			var cellIx = parseInt(cellIndex);
			var cell = getCell(cellIx, lineIx);

			if(document.grid[lineIx][cellIx] == "empty" && cell.getAttribute("data-value") == null){
				cell.setAttribute("data-value", "0");
			}else if (document.grid[lineIx][cellIx] == "bomb"){
				cell.setAttribute("data-value", "X");
				var gridSize = {
					width : document.grid[lineIx].length,
					height : document.grid.length
				};
				document.gridSize = gridSize;

				//incrementNeighbourgs(cellIx, lineIx, gridSize);
				var neighbourgs = getNeighbourgs(cellIx, lineIx, gridSize);
				for(var i = 0; i < neighbourgs.length; i++){
					incrementValue(neighbourgs[i]);
				}
			}

			cell.setAttribute("onclick", "javascript:reveal(this);")
		}
	}
}

function incrementNeighbourgs(currentCellIndex, currentLineIndex, gridSize){
	for(var y = -1; y <= 1; y++){
		for(var x = -1; x <= 1; x++){
			var isCurrent = (y == 0) && (x == 0);
			if (!isCurrent){
				var neighbourgLine = currentLineIndex + y;
				var neighbourgCell = currentCellIndex + x;

				var isInTable = neighbourgLine >= 0 && neighbourgCell >= 0
					&& neighbourgLine < gridSize.height && neighbourgCell < gridSize.width;

				if(isInTable){
					var neighbourg = getCell(neighbourgCell, neighbourgLine);
					incrementValue(neighbourg);
				}
			}
		}
	}
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

function reveal(cell){
	var value = cell.getAttribute("data-value");
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
			//getNeighbourgs and reveal
			var position = getPosition(cell);
			var neighbourgs = getNeighbourgs(position.x, position.y, document.gridSize);
			for(var i = 0; i < neighbourgs.length; i++){
				var neighbourg = neighbourgs[i];
				var cssClass = neighbourg.getAttribute("class");
				if (!cssClass){
					reveal(neighbourg);
				}
			}
		}
	}
}