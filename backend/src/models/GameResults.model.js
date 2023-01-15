const { model, Schema } = require("mongoose");

const gameResultSchema = new Schema({
  players: [],
  winner: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("GameResult", gameResultSchema, "gameResults");