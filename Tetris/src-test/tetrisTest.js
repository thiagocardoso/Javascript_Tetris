TetrisTest = TestCase("TetrisTest");

TetrisTest.prototype.testCreate = function (){
	var tetris = new Tetris();
	assertTrue(tetris!=null);
};

TetrisTest.prototype.testDrawField = function (){	
	var tetris = new Tetris();
	tetris.height = 200;
	tetris.width = 100;
	
	var drBox = new DrawBox(tetris);	
	assertTrue(drBox!=null);
};

TetrisTest.prototype.testTetriminos = function(){
	var oT = new Tetrimino_O();
	var iT = new Tetrimino_I();
	var lT = new Tetrimino_L();
	var jT = new Tetrimino_J();
	var sT = new Tetrimino_S();
	var zT = new Tetrimino_Z();
	var tT = new Tetrimino_T();
	
	assertTrue('O não é um tetrimino.', oT instanceof Tetrimino);
	assertTrue('I não é um tetrimino.', iT instanceof Tetrimino);
	assertTrue('L não é um tetrimino.', lT instanceof Tetrimino);
	assertTrue('J não é um tetrimino.', jT instanceof Tetrimino);
	assertTrue('S não é um tetrimino.', sT instanceof Tetrimino);
	assertTrue('Z não é um tetrimino.', zT instanceof Tetrimino);
	assertTrue('T não é um tetrimino.', tT instanceof Tetrimino);
};

TetrisTest.prototype.testScore = function(){
	var score = new Score();
	score.add(10);
	
	assertTrue('Score não está somando pontos.', score.getTotal()==10);
};