const { model, Schema } = require("mongoose");
const conn = require("../Conn");

const userSchema = new Schema({
  username: String,
  password: String,
  pokedex: [],
  coins: Number,
  isReady: Boolean,
  PokeFight: [],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema, "users");
