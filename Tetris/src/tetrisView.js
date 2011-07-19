const BOX_SIZE = 16;

var tetris = {};

function DrawBox(parent){
	this.parent = parent;	
	this.boxList = new matriz(Box, parent.height, parent.width);
	this.imageList = new ImageList();
};

function Box(){		
	this.width = BOX_SIZE;
	this.height = BOX_SIZE;
	this.emptyColor = "rgba(100, 100, 100, 0.6)";
	this.filledColor = "rgb(150, 40, 100)";	
	this.filledOut = false;
	this.imageSrc = "";
};

function ImageList(){
	this.imgAmarelo = new Image();
	this.imgAzul = new Image();
	this.imgBranco = new Image();
	this.imgLaranja = new Image();
	this.imgRoxo = new Image();
	this.imgVerde = new Image();
	this.imgVermelho = new Image();
	this.setupList();	
};

ImageList.prototype.setupList = function(){		
	this.imgAmarelo.src = "../views/images/amarelo.jpg";	
	this.imgAzul.src = "../views/images/azul.jpg";		
	this.imgBranco.src = "../views/images/branco.jpg";		
	this.imgLaranja.src = "../views/images/laranja.jpg";		
	this.imgRoxo.src = "../views/images/roxo.jpg";	
	this.imgVerde.src = "../views/images/verde.jpg";	
	this.imgVermelho.src = "../views/images/vermelho.jpg";
};

ImageList.prototype.getImage = function(image){
	//alert(image);
	switch (image){
		case "amarelo": return this.imgAmarelo;
						break;
		case "azul":	return this.imgAzul;
						break;
		case "branco":	return this.imgBranco;
						break;
		case "laranja":	return this.imgLaranja;
						break;
		case "roxo":	return this.imgRoxo;
						break;
		case "verde":	return this.imgVerde;
						break;
		case "vermelho":return this.imgVermelho;
						break;
	}
};

ImageList.prototype.drawImage = function(image, context, line, column){	
	context.drawImage(image, line, column, BOX_SIZE, BOX_SIZE);		
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
			this.boxList[i][j].drawBox = this;
			this.boxList[i][j].draw(j,i);
		};
	};		
};

DrawBox.prototype.clearBoxList = function(){			
	for (var i = 0; i < this.boxList.length; i++){				
		for (var j = 0; j < this.boxList[i].length; j++){		
			this.boxList[i][j].filledOut = false;
		};
	};	
};

DrawBox.prototype.isFilled = function(x,y){	
	return this.boxList[y][x].filledOut;
};

Box.prototype.drawImage = function(imagelist, context, line, column){	
	imagelist.drawImage(imagelist.getImage(this.imageSrc), context, line, column);
};

Box.prototype.draw = function(line, column){
	if (this.filledOut){
		if (this.imageSrc!=""){			
			this.drawImage(this.drawBox.imageList, this.context, line*BOX_SIZE, column*BOX_SIZE);			
		}else{
			this.context.fillStyle = this.filledColor;		
			this.context.fillRect(line*BOX_SIZE, column*BOX_SIZE, BOX_SIZE, BOX_SIZE);					
		}
	}else{
		this.context.strokeStyle = "rgba(100, 100, 100, 0.6)";		
		this.context.strokeRect(line*BOX_SIZE, column*BOX_SIZE, BOX_SIZE, BOX_SIZE);	
	}
};

function clearScreen(){		
	tetris.context.clearRect(0,0,tetris.getRealWidth(), tetris.getRealHeight());
	tetris.drawBox.clearBoxList();	
};

function initTetris(width, height){	
	tetris = new Tetris(width, height);				
	
	tetris.drawBox.Draw();				
	tetris.setUpTimer();		
	tetris.NewGame();	
};

function newGame(){	
	tetris.NewGame();
};

function changeScreen(){			
	clearScreen();		
	tetris.printBlocks();
	tetris.printTetrimino();			
	tetris.drawBox.drawBackground();
	tetris.drawBox.Draw();	
	tetris.score.printScore();
};