function DrawBox(parent){
	this.parent = parent;
};

function initTetris(width, height){
	var tetris = new Tetris();	
	tetris.width = width;
	tetris.height = height;
	
	tetris.canvas = document.createElement("canvas");	
	tetris.canvas.height = tetris.height+100;
	tetris.canvas.width = tetris.width+100;	
	tetris.context = tetris.canvas.getContext("2d");	
	document.getElementById("tetrisField").appendChild(tetris.canvas);	
	
	tetris.drawBox.Draw();
};

DrawBox.prototype.Draw = function (){
	this.parent.context.fillStyle = "rgba(50,60,50, 0.8)";	
	this.parent.context.fillRect(10, 10, this.parent.width+10, this.parent.height+10);
	this.parent.context.fillStyle = "rgba(185,200,185, 0.5)";
	this.parent.context.fillRect(15, 15, this.parent.width, this.parent.height);
};