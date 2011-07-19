var canReadKey = true;
var PONTO = 100;

function Score(){
	this.total = 0;
	this.element = document.getElementById("score");	
};

function Tetris(width, height) {		
	this.height = height;
	this.width = width;
	this.interval = 800;
	this.intervalID = {};
	this.score = new Score();
	this.tetriFactory = new TetriminoFactory();
	
	this.tetriminoList = [];	
	this.currentTetrimino = new Tetrimino();	
	this.nextTetrimino = new Tetrimino();
	
	this.blockList = [];
	
	this.setUpCanvas();	
	this.drawBox = new DrawBox(this);
	this.canReadKey = true;
	
	var self;
	this.setUpTimer = function(){
		self = this;
		this.intervalID = setInterval(OnTimer, this.interval);
	}
	
	this.tearDownTimer = function(){
		clearInterval(this.intervalID);
	}
	
	function OnTimer(){			
		changeScreen();		
		self.currentTetrimino.moveDown(false);
	}	
	
	//this.canvas.onkeypress = function(e){
	window.onkeypress = function(e){		
		var kCode = e.keyCode? e.keyCode : e.charCode;		
		
		if (canReadKey){
			switch (kCode){
				case 119: DoOnKeyArrowUp();
						  break;
				case 115: DoOnKeyArrowDown();
					 	  break;						
				case 97: DoOnKeyArrowLeft();
					 	 break;			
				case 100: DoOnKeyArrowRight();
					 	  break;						
				default:break;
			}
		}
	}	
		
	function DoOnKeyArrowUp(){
		self.currentTetrimino.rotate();
		changeScreen();
	}

	function DoOnKeyArrowDown(){						
		canReadKey = false;
		self.currentTetrimino.moveDown(true);
		changeScreen();						
		canReadKey = true;
	}

	function DoOnKeyArrowRight(){				
		self.currentTetrimino.moveRight();
		changeScreen();						
	}

	function DoOnKeyArrowLeft(){		
		self.currentTetrimino.moveLeft();
		changeScreen();						
	}
};

Score.prototype.reset = function(){
	this.total = 0;
};

Score.prototype.add = function(value){
	this.total += value;	
};

Score.prototype.getTotal = function(){
	return this.total;
};

Score.prototype.printScore = function(){
	this.element.innerHTML = "Score: "+ this.total;		
};

Tetris.prototype.setUpCanvas = function(){
	this.canvas = document.createElement("canvas");	
	this.canvas.height = this.height*BOX_SIZE;
	this.canvas.width = this.width*BOX_SIZE;	
	this.context = this.canvas.getContext("2d");	
	document.getElementById("tetrisField").appendChild(this.canvas);		
};

Tetris.prototype.NewGame = function(){
	this.tearDownTimer();
	this.setUpTimer();
	
	this.score.reset();
	this.clearTetriminos();
	
	this.currentTetrimino = new Tetrimino();	
	this.nextTetrimino = new Tetrimino();
	
	this.blockList = [];
	
	this.generateNext();
	this.NewTetrimino();	
};

Tetris.prototype.testColideLeft = function(block){		
	var test = false;
	test = block.posX>'0';	
	test = test && (!tetris.drawBox.isFilled(block.posX-1, block.posY));	
	return test;
};

Tetris.prototype.testColideRight = function(block){		
	var test = false;	
	test = block.posX<tetris.width-1;
	test = test && (!tetris.drawBox.isFilled(block.posX+1, block.posY));
	return test;
};

Tetris.prototype.testColideTop = function(block){		
	var test = false;	
	test = (block.posY<tetris.height-1);	
	test = test && (!tetris.drawBox.isFilled(block.posX, block.posY+1));	
	if(!test){
		tetris.NewTetrimino();
	}
	return test;
};

Tetris.prototype.generateNext = function(){
	this.nextTetrimino = this.tetriFactory.getRandomTetrimino();
	this.nextTetrimino.parent = this;				
	this.nextTetrimino.OnColideLeft = this.testColideLeft;
	this.nextTetrimino.OnColideRight = this.testColideRight;
	this.nextTetrimino.OnColideTop = this.testColideTop;
};

Tetris.prototype.isLineFull = function(line){
	var result = true;	
	for(var i = 0; i < this.drawBox.boxList[line].length; i++){
		result = result && (this.drawBox.boxList[line][i].filledOut);
	}
	return result;
};

Tetris.prototype.checkPoint = function(tetrim){	
	var checked = [];
	for(var i = 0; i < tetrim.blocks.length; i++){		
		if (checked.indexOf(tetrim.blocks[i].posY)==-1){			
			checked.push(tetrim.blocks[i].posY);
			if(this.isLineFull(tetrim.blocks[i].posY)){
				this.deleteLine(tetrim.blocks[i].posY);
				this.score.add(PONTO);
			}
		}
	}
};

Tetris.prototype.NewTetrimino = function(){		
	var lastTetrimino = this.currentTetrimino;	
	this.clearTetriminos();	
	this.currentTetrimino.cloneBlocks(this.blockList);	
	this.currentTetrimino = this.nextTetrimino;
	this.generateNext();
		
	this.currentTetrimino.actualX = Math.floor(this.width/2)-1;	
	this.addTetrimino(this.currentTetrimino);	
	this.checkPoint(lastTetrimino);
	
	if (this.currentTetrimino.anyColide(this.blockList)){
		this.gameOver();
	}
};

Tetris.prototype.gameOver = function(){
	this.tearDownTimer();
	alert("[Fim de jogo] Pontuação final: "+ this.score.getTotal());
};

Tetris.prototype.addTetrimino = function(tetrimino){
	tetrimino.boxList = this.drawBox.boxList;	
	this.tetriminoList.push(tetrimino);
};

Tetris.prototype.printTetrimino = function(){		
	for (var i = 0; i < this.tetriminoList.length; i++){		
		this.tetriminoList[i].draw();
	}	
};

Tetris.prototype.printBlocks = function(){		
	for (var i = 0; i < this.blockList.length; i++){
		this.blockList[i].draw(this.drawBox.boxList);
	}
};

Tetris.prototype.deleteLine = function(y){
	var i = 0;
	while(i < this.blockList.length){		
		if (this.blockList[i].posY==y){			
			this.blockList.splice(i,1);
			i = 0;
		}else{			
			i++;
		}
	}
	
	for (i=0; i<this.blockList.length; i++){
		if (this.blockList[i].posY<y){
			this.blockList[i].posY++;
		}
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

Tetris.prototype.getRealHeight = function(){
	var real = this.canvas.height;
	return real;
};

Tetris.prototype.getRealWidth = function(){
	var real = this.canvas.width;
	return real;
};
