function Tetrimino(){
	this.color = 'black';
};

Tetrimino.prototype.rotate = function(){};

Tetrimino.prototype.moveDown = function(){};

Tetrimino.prototype.draw = function(){};

function Score(){
	this.total = 0;
};

function Tetris() {
	this.height = 0;
	this.width = 0;
	this.drawBox = new DrawBox(this);
};


Score.prototype.add = function(value){
	this.total += value;
};

Score.prototype.getTotal = function(){
	return this.total;
};