const BOX_SIZE = 20;

var tetris = {};

function DrawBox(parent){
	this.parent = parent;	
	this.boxList = new matriz(Box, parent.height, parent.width);
};

function initTetris(width, height){
	tetris = new Tetris(width, height);				
	tetris.insertTetrimino(tetris, 2, 1);		
	tetris.insertTetrimino(tetris, 10, 5);
	tetris.printTetrimino();
	tetris.drawBox.Draw();
};

function changeScreen(){	
	clearScreen();
	tetris.insertTetrimino(tetris, 2, 1);		
	tetris.insertTetrimino(tetris, 10, 5);
	tetris.printTetrimino();	
	tetris.drawBox.Draw();	
};

DrawBox.prototype.drawBackground = function(){
	this.parent.context.fillStyle = "rgb(30, 40 ,50)";
	this.parent.context.fillRect(0,0, this.parent.width*BOX_SIZE, this.parent.height*BOX_SIZE);			
};

DrawBox.prototype.Draw = function (){					
	this.drawBackground();	
	for (var i = 0; i < this.boxList.length; i++){				
		for (var j = 0; j < this.boxList[i].length; j++){
			this.boxList[i][j].context = this.parent.context;			
			this.boxList[i][j].draw(j,i);
		}
	}		
};

DrawBox.prototype.clearBoxList = function(){			
	for (var i = 0; i < this.boxList.length; i++){				
		for (var j = 0; j < this.boxList[i].length; j++){		
			this.boxList[i][j].filledOut = false;
		}
	}	
};

function clearScreen(){
	tetris.clearTetriminos();
	alert(tetris.realWidth);
	tetris.context.clearRect(0,0,tetris.realWidth, tetris.realHeight);
	tetris.drawBox.clearBoxList();	
};
