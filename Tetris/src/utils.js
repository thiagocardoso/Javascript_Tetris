function matriz(tipo, linhas, colunas) {	
    var m = [];
    for (var i = 0; i < linhas; i++) {
        var linha = [];
        for (var j = 0; j < colunas; j++) {
            linha.push(new tipo());
        }
        m.push(linha);
    }
    return m;
};

function randint(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

function doisDigitos(n){
    if (n < 10) {
        return "0" + n;
    }
    return "" + n;
}

function Timer() {
    this.parado = true;
    this.zera();
}

Timer.prototype = {
    inicia: function () {
        this.parado = false;
        this.inicio = new Date();
    },

    zera: function () {
        this.fim = new Date();
        this.inicio = this.fim;
    },

    para: function () {
        this.parado = true;
        this.fim = new Date();
    },

    tempo: function () {
        if (!this.parado) {
            this.fim = new Date();
        }
        this.tempoPassado = new Date(this.fim.getTime() - this.inicio.getTime());
        return this.tempoPassado;
    },

    tempoHMS: function () {
        var t = this.tempo();
        var h = doisDigitos(t.getUTCHours());
        var m = doisDigitos(t.getUTCMinutes());
        var s = doisDigitos(t.getUTCSeconds());
        return h + ":" + m + ":" + s;
    }
};

function getRandom()
{	
	return Math.random();
};

function getRandomArbitary(min, max){
	return Math.random() * (max-min) + min;
};

function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max-min+1)) + min;
};
