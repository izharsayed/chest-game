// This file contains the chessboard UI library that provides the functionality to display the chessboard and manage piece movements.

const chessboard = {
    board: null,
    game: new Chess(),
    onDragStart: function (source, piece, position, orientation) {
        if (this.game.in_checkmate() === true || this.game.in_draw() === true ||
            piece.search(/^b/) !== -1) {
            return false;
        }
    },
    makeBestMove: function () {
        const bestMove = this.getBestMove();
        this.game.move(bestMove);
        this.updateBoard();
    },
    getBestMove: function () {
        // Implement AI logic here to get the best move
        // This is a placeholder for AI move logic
        const possibleMoves = this.game.ugly_moves();
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    },
    updateBoard: function () {
        this.board.position(this.game.fen());
        if (this.game.game_over()) {
            alert('Game over');
        }
    },
    onDrop: function (source, target) {
        const move = this.game.move({
            from: source,
            to: target,
            promotion: 'q' // promote to queen
        });

        this.updateBoard();

        if (move === null) return 'snapback';
        this.makeBestMove();
    },
    onSnapEnd: function () {
        this.updateBoard();
    },
    init: function () {
        const cfg = {
            draggable: true,
            position: 'start',
            onDragStart: this.onDragStart.bind(this),
            onDrop: this.onDrop.bind(this),
            onSnapEnd: this.onSnapEnd.bind(this),
            onMouseoutSquare: this.onMouseoutSquare.bind(this),
            onMouseoverSquare: this.onMouseoverSquare.bind(this)
        };
        this.board = ChessBoard('board', cfg);
        this.updateBoard();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    chessboard.init();
});