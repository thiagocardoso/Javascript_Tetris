function Score(){
	this.total = 0;
};

function Tetris(width, height) {	
	this.height = height;
	this.width = width;

	this.canvas = document.createElement("canvas");	
	this.canvas.height = height*BOX_SIZE;
	this.canvas.width = width*BOX_SIZE;	
	this.context = this.canvas.getContext("2d");	
	document.getElementById("tetrisField").appendChild(this.canvas);		
	
	this.tetriminoList = [];	
	this.drawBox = new DrawBox(this);
};

function Box(){		
	this.width = BOX_SIZE;
	this.height = BOX_SIZE;
	this.emptyColor = "rgba(100, 100, 100, 0.6)";
	this.filledColor = "rgb(150, 40, 100)";	
	this.filledOut = false;
};

Box.prototype.draw = function(line, column){
	if (this.filledOut){
		this.context.fillStyle = this.filledColor;		
		this.context.fillRect(line*BOX_SIZE, column*BOX_SIZE, BOX_SIZE, BOX_SIZE);			
	}else{
		this.context.strokeStyle = "rgba(100, 100, 100, 0.6)";		
		this.context.strokeRect(line*BOX_SIZE, column*BOX_SIZE, BOX_SIZE, BOX_SIZE);	
	}
}

Score.prototype.add = function(value){
	this.total += value;
};

Score.prototype.getTotal = function(){
	return this.total;
};

Tetris.prototype.addTetrimino = function(tetrimino){	
	this.tetriminoList.push(tetrimino);
};

Tetris.prototype.printTetrimino = function(){			
	for (var i = 0; i < this.tetriminoList.length; i++){
		this.tetriminoList[i].draw();
	}	
};

Tetris.prototype.insertTetrimino = function(tetris, y, x){	
	var tFactory = new TetriminoFactory();		
	var tetrimino = tFactory.getRandomTetrimino();	
	tetrimino.boxList = tetris.drawBox.boxList;
	tetrimino.actualX = x;
	tetrimino.actualY = y;		
	tetris.addTetrimino(tetrimino);	
};

Tetris.prototype.clearTetriminos = function(){
	this.tetriminoList = [];
};

Tetris.prototype.realHeight = function(){
	var real = this.height*BOX_SIZE;
	return real;
};

Tetris.prototype.realWidth = function(){
	var real = this.width*BOX_SIZE;
	return real;
};
