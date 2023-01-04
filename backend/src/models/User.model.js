const { model, Schema, default: mongoose } = require("mongoose");
const conn = require("../Conn");

const userSchema = new Schema({
  username: String,
  password: String,
  pokedex: [],
  coins: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema, "users");
