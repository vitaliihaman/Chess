var iconMap = {
    p: "wPawn.ico",
    r: "wCastle.ico",
    n: "wKnight.ico",
    b: "wBishop.ico",
    q: "wKing.ico",
    k: "wQueen.ico",
    P: "bPawn.ico",
    R: "bCastle.ico",
    N: "bKnight.ico",
    B: "bBishop.ico",
    Q: "bKing.ico",
    K: "bQueen.ico"

};

function Game() {
    this.player1 = null;
    this.player2 = null;
    this.figures = [];
    this.board = [];
    this.figurePosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

    this.initialize();
}

Game.prototype.initialize = function () {
    this.createPlayers();
    this.createBoard();
    this.createFigure();
    this.drawFigure();
   // this.moveFigure();
};

Game.prototype.createPlayers = function () {
    this.player1 = new Player('Artem');
    this.player2 = new Player('Vetal');
};


Game.prototype.createBoard = function () {
    this.board = new Board();
};

Game.prototype.drawFigure = function () {
    var board = $("tbody");
    console.log(board);

    for (var i = 0; i < this.figures.length; i++) {
        var fig = this.figures[i],
            img = $('<img/>').attr('src', '' + fig['picture']),
            y = fig.y,
            x = fig.x,
            row = board.children('tr')[y],
            cell = $(row).find('td')[x];
        $(cell).append(img);

        $(img).click(function (event) {
            return event;
        });
        /* $(cell).css({
         backgroundImage : " url('"+ fig.picture + " ')",
         backgroundRepeat: "no-repeat",
         backgroundSize: "content"
         })*/
    }

};

Game.prototype.createFigure = function () {
    var positionW = 'rnbqkbnrpppppppp'.split(""),
        positionB = 'PPPPPPPPRNBQKBNR'.split("");

    for (var i = 0; i < 16; i++) {
        var figure = new Figures({
            id: positionW[i],
            img: iconMap[positionW[i]],
            x: i < this.board.width ? i : i - this.board.width,
            y: i < this.board.width ? 0 : 1
        });

        figure.owner = this.player1;
        this.figures.push(figure);
        this.player1.figures.push(figure);
    }


    for (var j = 0; j < 16; j++) {
        var fig = new Figures({
            id: positionB[j],
            img: iconMap[positionB[j]],
            x: j < this.board.width ? j : j - this.board.width,
            y: j < this.board.width ? 6 : 7
        });

        fig.owner = this.player2;
        this.figures.push(fig);
        this.player2.figures.push(fig);
    }
    console.log(this.figures);
};


function Board() {
    this.width = 8;
    this.height = 8;
    this.white = "#ffffff";
    this.black = "#d2691e";

    this.initialize();
}


Board.prototype.initialize = function () {
    this.drawBoard();
};

Board.prototype.drawBoard = function () {
    var wrapper = $('#wrapper');
    var table = $('<table/>').addClass('table');

    for (var i = 0; i < this.width; i++) {
        var row = $('<tr/>');

        for (var j = 0; j < this.height; j++) {
            var col = $('<td/>');
            col.css({
                backgroundColor: this.white
            });
            if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
                col.css({
                    backgroundColor: this.black
                });
            }

            row.append(col);

        }
        table.append(row);
    }
    wrapper.append(table);
var tdd = $("td")
};


function Figures(options) {
    var baseLink = "assets/images/chessFig/";
    this.picture = baseLink + options.img;
    this.x = options.x;
    this.y = options.y;
    this.ways = null;
    this.owner = null;
    this.id = options.id;

}

Figures.prototype.ways = function () {
    this.p = {
        steps: 2,
        x: null,
        y: this.y + steps
    }
};


function Player(name) {
    this.name = name;
    this.timer = null;
    this.figures = [];
    this.active = null;
}



function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

var game = new Game();


