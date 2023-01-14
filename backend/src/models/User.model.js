const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  pokedex: [],
  coins: Number,
  result: String,
  isReady: {
    type: Boolean,
    default: false,
  },
  PokeFight: [],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema, "users");
