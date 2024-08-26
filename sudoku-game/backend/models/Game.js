const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  board: { type: Array, required: true },
  difficulty: { type: String, required: true },
  score: { type: [Number], default: [0] },
  mistakesLeft: { type: Number, default: 3 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
});
gameSchema.index({ user: 1, createdAt: -1 });
const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
