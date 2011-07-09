//TETRIMINO FACTORY ---------------------------------------------------------------------------
function TetriminoFactory(){	
};

TetriminoFactory.prototype.getRandomTetrimino = function (){
	var numRandom = 0;
	var tetrimino = new Tetrimino();
	numRandom = getRandomInt(0, 13);	
	switch (numRandom){
		case 0:
		case 1: tetrimino = new Tetrimino_O();
				break;
		case 2:	
		case 3: tetrimino = new Tetrimino_I();
				break;
		case 4: 		
		case 5: tetrimino = new Tetrimino_J();
				break;
		case 6: 
		case 7: tetrimino = new Tetrimino_L();
				break;
		case 8:
		case 9: tetrimino = new Tetrimino_S();
				break;
		case 10:
		case 11:tetrimino = new Tetrimino_Z();
				break;
		case 12:
		case 13:tetrimino = new Tetrimino_T();
				break;
	}		
	return tetrimino;
};

//TETRIMINO -----------------------------------------------------------------------------------
function Tetrimino(){
	this.color = "";	
	this.image = "";		
	this.actualX = 0;
	this.actualY = 0;
	this.boxList = [];	
};

Tetrimino.prototype.setColor = function (r,g,b){
	this.color = "rgb("+ r +", "+ g +", "+ b +")";
};

Tetrimino.prototype.rotate = function(){};

Tetrimino.prototype.moveDown = function(){};

Tetrimino.prototype.draw = function(){	
};

Tetrimino.prototype.fillBox = function(boxX, boxY){
	this.boxList[boxY][boxX].filledColor= this.color;
	this.boxList[boxY][boxX].filledOut = true;	
};

//TETRIMINO O --------------------------------------------------------------------------------
function Tetrimino_O(){		
	//this.color = "rgb(40, 120, 80)";
	this.setColor(40, 120, 80);
};
Tetrimino_O.prototype = new Tetrimino();

Tetrimino_O.prototype.draw = function(){	
	this.fillBox(this.actualX, this.actualY);
	this.fillBox(this.actualX+1, this.actualY);
	this.fillBox(this.actualX, this.actualY+1);
	this.fillBox(this.actualX+1, this.actualY+1);
};

//TETRIMINO I --------------------------------------------------------------------------------
function Tetrimino_I(){	
	//this.color = "rgb(255, 0, 255)";
	this.setColor(255, 0, 255);
};
Tetrimino_I.prototype = new Tetrimino();
Tetrimino_I.prototype.draw = function(){		
	this.fillBox(this.actualX, this.actualY);
	this.fillBox(this.actualX, this.actualY+1);
	this.fillBox(this.actualX, this.actualY+2);
	this.fillBox(this.actualX, this.actualY+3);	
};

//TETRIMINO T --------------------------------------------------------------------------------
function Tetrimino_T(){	
	this.setColor(0, 255, 0);
};
Tetrimino_T.prototype = new Tetrimino();
Tetrimino_T.prototype.draw = function(){	
	this.fillBox(this.actualX, this.actualY);
	this.fillBox(this.actualX+1, this.actualY);
	this.fillBox(this.actualX+2, this.actualY);
	this.fillBox(this.actualX+1, this.actualY+1);
};

//TETRIMINO L --------------------------------------------------------------------------------
function Tetrimino_L(){	
	this.setColor(219, 112, 147);
};
Tetrimino_L.prototype = new Tetrimino();
Tetrimino_L.prototype.draw = function(){	
	this.fillBox(this.actualX, this.actualY);
	this.fillBox(this.actualX, this.actualY+1);
	this.fillBox(this.actualX, this.actualY+2);
	this.fillBox(this.actualX+1, this.actualY+2);
};	
//TETRIMINO J --------------------------------------------------------------------------------
function Tetrimino_J(){	
	this.setColor(127, 0, 255);
};
Tetrimino_J.prototype = new Tetrimino();
Tetrimino_J.prototype.draw = function(){	
	this.fillBox(this.actualX+1, this.actualY);
	this.fillBox(this.actualX+1, this.actualY+1);
	this.fillBox(this.actualX+1, this.actualY+2);
	this.fillBox(this.actualX, this.actualY+2);
};	

//TETRIMINO S --------------------------------------------------------------------------------
function Tetrimino_S(){	
	this.setColor(217, 217, 243);
};
Tetrimino_S.prototype = new Tetrimino();
Tetrimino_S.prototype.draw = function(){	
	this.fillBox(this.actualX+1, this.actualY);
	this.fillBox(this.actualX+2, this.actualY);
	this.fillBox(this.actualX, this.actualY+1);
	this.fillBox(this.actualX+1, this.actualY+1);
};	
//TETRIMINO Z --------------------------------------------------------------------------------
function Tetrimino_Z(){
	this.setColor(77, 77, 255);
};
Tetrimino_Z.prototype = new Tetrimino();
Tetrimino_Z.prototype.draw = function(){	
	this.fillBox(this.actualX, this.actualY);
	this.fillBox(this.actualX+1, this.actualY);
	this.fillBox(this.actualX+1, this.actualY+1);
	this.fillBox(this.actualX+2, this.actualY+1);
};	
