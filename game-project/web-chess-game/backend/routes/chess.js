const express = require('express');
const router = express.Router();
const { getGameState, makeMove } = require('../services/chessService');

// Route to get the current game state
router.get('/state', (req, res) => {
    const gameState = getGameState();
    res.json(gameState);
});

// Route to make a move
router.post('/move', (req, res) => {
    const { move } = req.body;
    const result = makeMove(move);
    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json({ error: result.error });
    }
});

module.exports = router;