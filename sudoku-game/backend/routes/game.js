// backend/routes/game.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Kullanıcıya ait oyunları yükleme
router.get('/user/:userId', gameController.getGamesByUserId);

// Oyun verilerini ID ile yükleme
router.get('/:gameId', gameController.getGameById);

// Oyun kaydetme
router.post('/save', gameController.saveGame);

module.exports = router;
