const mongoose = require('mongoose');
const Game = require('../models/Game');

// Kullanıcıya ait oyunları yükleme
exports.getGamesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Geçersiz kullanıcı ID." });
    }

    const games = await Game.find({
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!games || games.length === 0) {
      return res.status(404).json({ message: "Oyun bulunamadı." });
    }

    res.status(200).json(games);
  } catch (error) {
    console.error("Kullanıcıya ait oyunlar yüklenirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası oluştu." });
  }
};

// Oyun verilerini ID ile yükleme
exports.getGameById = async (req, res) => {
  try {
    const { gameId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ message: "Geçersiz oyun ID." });
    }

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Oyun bulunamadı." });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error("Oyun yüklenirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası oluştu." });
  }
};

// Oyun kaydetme
exports.saveGame = async (req, res) => {
  try {
    const { user, board, difficulty, score, mistakesLeft, completed, name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "Geçersiz kullanıcı ID." });
    }

    // Yeni oyunu oluşturma ve veritabanına kaydetme
    const newGame = new Game({
      user,
      board,
      difficulty,
      score,
      mistakesLeft,
      completed,
      name
    });

    await newGame.save();

    res.status(201).json(newGame);
  } catch (error) {
    console.error("Oyun kaydedilirken hata oluştu:", error);
    res.status(500).json({ message: "Oyun kaydedilirken hata oluştu." });
  }
};
