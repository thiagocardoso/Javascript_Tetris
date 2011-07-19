//TETRIMINO FACTORY ---------------------------------------------------------------------------
function TetriminoFactory(){	
};

TetriminoFactory.prototype.getRandomTetrimino = function (){
	var numRandom = 0;
	var tetrimino = new Tetrimino();
	numRandom = getRandomInt(0, 13);	
	switch (numRandom){
		case 0:
		case 1: tetrimino = new Tetrimino_I();
				break;
		case 2:	
		case 3: tetrimino = new Tetrimino_S();
				break;
		case 4: 		
		case 5: tetrimino = new Tetrimino_T();
				break;
		case 6: 
		case 7: tetrimino = new Tetrimino_O();
				break;
		case 8:
		case 9: tetrimino = new Tetrimino_L();
				break;
		case 10:
		case 11:tetrimino = new Tetrimino_J();
				break;
		case 12:
		case 13:tetrimino = new Tetrimino_Z();
				break;
	}		
	return tetrimino;
};

//BLOCK ---------------------------------------------------------------------------------------
function Block(x, y, ccL, ccR, ccT){	
	this.posX = x;
	this.posY = y;
	this.color = "";
	this.image = "";
	this.canColideLeft = ccL;
	this.canColideRight = ccR;
	this.canColideTop = ccT;
};

Block.prototype.draw = function(boxList){	
	boxList[this.posY][this.posX].imageSrc = this.image;
	boxList[this.posY][this.posX].filledColor= this.color;
	boxList[this.posY][this.posX].filledOut = true;		
};

//TETRIMINO -----------------------------------------------------------------------------------
function Tetrimino(){
	this.color = "";	
	this.image = "";		
	this.actualX = 0;
	this.actualY = 0;
	this.edgeRight = 0;
	this.edgeLeft = 0;
	this.edgeTop = 0;
	this.boxList = [];	
	this.blocks = [];	
	this.position = 0;
	this.positionCount = 0;			
};

Tetrimino.prototype.setColor = function (r,g,b){
	this.color = "rgb("+ r +", "+ g +", "+ b +")";
};

Tetrimino.prototype.rotate = function(){
	if (this.position>=this.positionCount){
		this.position = 0;
	}else{
		this.position++;
	}
};

Tetrimino.prototype.moveDown = function(userMove){	
	var test = true;	
	for(var i=0;i<this.blocks.length;i++){
		if (this.blocks[i].canColideTop){
			test = test && this.blocks[i].OnColideTop(this.blocks[i]);
		}		
	}
	
	if(test){
		if ((!userMove)||(test&&(this.actualY+2 < tetris.height-1))){
			this.actualY += 1;
		}
	}
};

Tetrimino.prototype.moveLeft = function(){		
	var test = true;	
	for(var i=0;i<this.blocks.length;i++){
		if (this.blocks[i].canColideLeft){
			test = test && this.blocks[i].OnColideLeft(this.blocks[i]);
		}
	}
	
	if(test&&(this.actualX-1>=0)){
		this.actualX -= 1;	
	}
};

Tetrimino.prototype.moveRight = function(){	
	var test = true;	
	for(var i=0;i<this.blocks.length;i++){
		if (this.blocks[i].canColideRight){
			test = test && this.blocks[i].OnColideRight(this.blocks[i]);
		}
	}
	
	if(test&&(this.actualX+1<tetris.width)){
		this.actualX += 1;	
	}
};

Tetrimino.prototype.draw = function(){	
};

Tetrimino.prototype.fillBox = function(boxX, boxY){
	this.boxList[boxY][boxX].filledColor= this.color;
	this.boxList[boxY][boxX].filledOut = true;	
};

Tetrimino.prototype.setAxis = function(left, right, top){
	this.edgeLeft = left;
	this.edgeRight = right;
	this.edgeTop = top;
};

Tetrimino.prototype.leftLimit = function(){
	return this.edgeLeft + this.actualX;
};

Tetrimino.prototype.rightLimit = function(){
	return this.edgeRight + this.actualX;
};

Tetrimino.prototype.topLimit = function(){
	return this.edgeTop + this.actualY;
};

Tetrimino.prototype.addBlock = function(x, y, ccL, ccR, ccT){	
	var newBlock = new Block(this.actualX+x, this.actualY+y, ccL, ccR, ccT);		
	newBlock.OnColideLeft = this.OnColideLeft;		
	newBlock.OnColideRight = this.OnColideRight;	
	newBlock.OnColideTop = this.OnColideTop;
	newBlock.color = this.color;	
	newBlock.image = this.image;
	newBlock.draw(this.boxList);
	this.blocks.push(newBlock);			
};

Tetrimino.prototype.cloneBlocks = function(blockList){	
	for(var i = 0; i<this.blocks.length; i++){
		blockList.push(this.blocks[i]);
	}
};

Tetrimino.prototype.anyColide = function(blockList){	
	var test = false;
	this.draw();	
	for (var i=0;i<this.blocks.length;i++){		
		for (var j=0;j<blockList.length;j++){			
			test = test || ((blockList[j].posY==this.blocks[i].posY)&&(blockList[j].posX==this.blocks[i].posX));
		}
	};	
	return test;
};

//TETRIMINO O --------------------------------------------------------------------------------
function Tetrimino_O(){			
	this.setColor(40, 120, 80);
	//this.image = "../views/images/amarelo.jpg";
	this.image = "amarelo";
};
Tetrimino_O.prototype = new Tetrimino();

Tetrimino_O.prototype.draw = function(){	
	this.setAxis(0, 1, 1);
	this.blocks = [];	
	this.addBlock(0,0,true,false,false);
	this.addBlock(1,0,false,true,false);
	this.addBlock(0,1,true,false,true);
	this.addBlock(1,1,false,true,true);
};

//TETRIMINO I --------------------------------------------------------------------------------
function Tetrimino_I(){	
	//this.color = "rgb(255, 0, 255)";
	this.setColor(255, 0, 255);
	//this.image = "../views/images/roxo.jpg";
	this.image = "roxo";
};
Tetrimino_I.prototype = new Tetrimino();
Tetrimino_I.prototype.draw = function(){
	this.setAxis(0, 0, 3);	
	this.blocks = [];
	
	this.positionCount = 1;
	
	switch (this.position){
		case 0:{
			this.addBlock(0,0,true,true,false);
			this.addBlock(0,1,true,true,false);
			this.addBlock(0,2,true,true,false);
			this.addBlock(0,3,true,true,true);
			break;
		}
		case 1:{
			this.addBlock(0,0,true,false,true);
			this.addBlock(1,0,false,false,true);
			this.addBlock(2,0,false,false,true);
			this.addBlock(3,0,false,true,true);
			break;
		}
	}	
};

//TETRIMINO T --------------------------------------------------------------------------------
function Tetrimino_T(){	
	this.setColor(0, 255, 0);
	//this.image = "../views/images/verde.jpg";
	this.image = "verde";	
};
Tetrimino_T.prototype = new Tetrimino();
Tetrimino_T.prototype.draw = function(){	
	this.setAxis(0, 2, 1);				
	this.blocks = [];
	
	this.positionCount = 3;
	
	switch (this.position){
		case 0:{	
			this.addBlock(0,0,true,false,true);
			this.addBlock(1,0,false,false,false);
			this.addBlock(2,0,false,true,true);
			this.addBlock(1,1,true,true,true);
			break;
		}
		case 1:{
			this.addBlock(0,0,true,true,false);
			this.addBlock(0,1,true,false,false);
			this.addBlock(0,2,true,true,true);
			this.addBlock(1,1,false,true,true);
			break;
		}
		case 2:{
			this.addBlock(1,0,true,true,false);
			this.addBlock(0,1,true,false,true);
			this.addBlock(1,1,false,false,true);
			this.addBlock(2,1,false,true,true);
			break;
		}
		case 3:{
			this.addBlock(0,1,true,false,true);
			this.addBlock(1,0,true,true,false);
			this.addBlock(1,1,false,true,false);
			this.addBlock(1,2,true,true,true);
			break;
		}
	}
};

//TETRIMINO L --------------------------------------------------------------------------------
function Tetrimino_L(){	
	this.setColor(219, 112, 147);
	//this.image = "../views/images/azul.jpg";
	this.image = "azul";
};
Tetrimino_L.prototype = new Tetrimino();
Tetrimino_L.prototype.draw = function(){	
	this.setAxis(0, 1, 2);
	this.blocks = [];
	
	this.positionCount = 3;
	
	switch (this.position){
		case 0:{	
			this.addBlock(0,0,true,true,false);
			this.addBlock(0,1,true,true,false);
			this.addBlock(0,2,true,false,true);
			this.addBlock(1,2,false,true,true);
			break;
		}
		case 1:{
			this.addBlock(0,1,true,false,true);
			this.addBlock(1,1,false,false,true);
			this.addBlock(2,1,false,true,true);
			this.addBlock(2,0,true,true,false);
			break;			
		}
		case 2:{
			this.addBlock(0,0,true,false,true);
			this.addBlock(1,0,false,true,false);
			this.addBlock(1,1,true,true,false);
			this.addBlock(1,2,true,true,true);
			break;
		}
		case 3:{
			this.addBlock(0,0,true,false,false);
			this.addBlock(1,0,false,false,true);
			this.addBlock(2,0,false,true,true);
			this.addBlock(0,1,true,true,true);
			break;			
		}
	}
};	
//TETRIMINO J --------------------------------------------------------------------------------
function Tetrimino_J(){	
	this.setColor(127, 0, 255);
//	this.image = "../views/images/branco.jpg";
	this.image = "branco";
};
Tetrimino_J.prototype = new Tetrimino();
Tetrimino_J.prototype.draw = function(){		
	this.setAxis(0, 1, 2);			
	this.blocks = [];
	
	this.positionCount = 3;
	
	switch (this.position){
		case 0:{	
			this.addBlock(1,0,true,true,false);
			this.addBlock(1,1,true,true,false);
			this.addBlock(1,2,false,true,true);
			this.addBlock(0,2,true,false,true);
			break;
		}
		case 1:{
			this.addBlock(0,0,true,false,true);
			this.addBlock(1,0,false,false,true);
			this.addBlock(2,0,false,true,false);
			this.addBlock(2,1,true,true,true);
			break;			
		}
		case 2:{
			this.addBlock(0,0,true,false,false);
			this.addBlock(0,1,true,true,false);
			this.addBlock(0,2,true,true,true);
			this.addBlock(1,0,false,true,true);
			break;
		}
		case 3:{
			this.addBlock(0,0,true,true,false);
			this.addBlock(0,1,true,false,true);
			this.addBlock(1,1,false,false,true);
			this.addBlock(2,1,false,true,true);
			break;			
		}
	}	
};	

//TETRIMINO S --------------------------------------------------------------------------------
function Tetrimino_S(){	
	this.setColor(217, 217, 243);
//	this.image = "../views/images/laranja.jpg";
	this.image = "laranja";
};
Tetrimino_S.prototype = new Tetrimino();
Tetrimino_S.prototype.draw = function(){	
	this.setAxis(0, 2, 1);	
	this.blocks = [];
	
	this.positionCount = 1;
		
	switch (this.position){
		case 0:{		
			this.addBlock(1,0,true,false,false);
			this.addBlock(2,0,false,true,true);
			this.addBlock(0,1,true,false,true);
			this.addBlock(1,1,false,true,true);
			break;
		}
		case 1:{		
			this.addBlock(0,0,true,true,false);
			this.addBlock(0,1,true,false,true);
			this.addBlock(1,1,false,true,false);
			this.addBlock(1,2,true,true,true);
			break;
		}
	}
			
};	
//TETRIMINO Z --------------------------------------------------------------------------------
function Tetrimino_Z(){
	this.setColor(77, 77, 255);
//	this.image = "../views/images/vermelho.jpg";
	this.image = "vermelho";
};
Tetrimino_Z.prototype = new Tetrimino();
Tetrimino_Z.prototype.draw = function(){	
	this.setAxis(0, 2, 1);	
	this.blocks = [];
	
	this.positionCount = 1;
	
	switch (this.position){
		case 0:{		
			this.addBlock(0,0,true,false,true);
			this.addBlock(1,0,false,true,false);
			this.addBlock(1,1,true,false,true);
			this.addBlock(2,1,false,true,true);
			break;
		}
		case 1:{		
			this.addBlock(1,0,true,true,false);
			this.addBlock(1,1,false,true,true);
			this.addBlock(0,1,true,false,false);
			this.addBlock(0,2,true,true,true);
			break;
		}
	}
};	
