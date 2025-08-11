// frontend/js/app.js

const apiUrl = 'http://localhost:3000/api/chess'; // Adjust based on your backend URL
let board;
let game = new Chess(); // Assuming you are using chess.js library

function onDragStart (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
}

function makeBestMove() {
    const bestMove = getBestMove(game);
    game.move(bestMove);
    renderMove(bestMove);
    if (game.game_over()) {
        alert('Game over');
    }
}

function getBestMove(game) {
    // Call the backend AI service to get the best move
    return fetch(`${apiUrl}/best-move`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fen: game.fen() })
    })
    .then(response => response.json())
    .then(data => data.move)
    .catch(err => console.error(err));
}

function renderMove(move) {
    board.move(move);
    render();
}

function render() {
    board.position(game.fen());
}

function onDrop (source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // promote to queen
    });

    removeGreySquares();
    render();

    if (move === null) return; // illegal move

    // Make AI move after player's move
    setTimeout(makeBestMove, 250);
}

function onSnapEnd () {
    render();
}

function onMouseoutSquare(square, piece) {
    removeGreySquares();
}

function onMouseoverSquare(square, piece) {
    const moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (let i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
}

function removeGreySquares() {
    $('#board .square-55d63').css('background', '');
}

function greySquare(square) {
    const squareEl = $('#board .square-' + square);

    const background = '#a9a9a9';
    squareEl.css('background', background);
}

function init() {
    const cfg = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd
    };

    board = ChessBoard('board', cfg);
}

$(document).ready(function() {
    init();
});