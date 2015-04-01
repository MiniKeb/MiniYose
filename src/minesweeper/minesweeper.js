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