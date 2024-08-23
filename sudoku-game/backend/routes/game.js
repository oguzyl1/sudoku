const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Kullanıcıya ait oyunları yükleme
router.get('/load/user/:userId', gameController.getGamesByUserId);

// Oyun verilerini ID ile yükleme
router.get('/load/game/:gameId', gameController.getGameById);

// Oyun kaydetme
router.post('/save', gameController.saveGame);

module.exports = router;
