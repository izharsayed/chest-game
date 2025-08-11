// This file implements the AI logic for the chess game. It exports a function that generates a move using the chess.js library, either through a minimax algorithm or by selecting a random legal move.

const { Chess } = require('chess.js');

const chess = new Chess();

function getRandomMove() {
    const legalMoves = chess.legal_moves();
    const randomIndex = Math.floor(Math.random() * legalMoves.length);
    return legalMoves[randomIndex];
}

function minimax(depth, isMaximizing) {
    if (depth === 0 || chess.game_over()) {
        return evaluateBoard();
    }

    let bestMove;
    if (isMaximizing) {
        let maxEval = -Infinity;
        const moves = chess.legal_moves();
        for (const move of moves) {
            chess.move(move);
            const eval = minimax(depth - 1, false);
            chess.undo();
            if (eval > maxEval) {
                maxEval = eval;
                bestMove = move;
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        const moves = chess.legal_moves();
        for (const move of moves) {
            chess.move(move);
            const eval = minimax(depth - 1, true);
            chess.undo();
            if (eval < minEval) {
                minEval = eval;
                bestMove = move;
            }
        }
        return minEval;
    }
}

function evaluateBoard() {
    // Simple evaluation function
    const pieceValues = {
        'p': 1,
        'r': 5,
        'n': 3,
        'b': 3,
        'q': 9,
        'k': 0
    };

    let totalEvaluation = 0;
    for (let row of chess.board()) {
        for (let piece of row) {
            if (piece) {
                const sign = piece.color === 'w' ? 1 : -1;
                totalEvaluation += sign * pieceValues[piece.type];
            }
        }
    }
    return totalEvaluation;
}

function getAIMove() {
    // Uncomment the following line to use minimax
    // return minimax(3, true);
    
    // Default to random move
    return getRandomMove();
}

module.exports = { getAIMove };