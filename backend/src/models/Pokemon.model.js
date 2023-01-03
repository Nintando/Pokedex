const { model, Schema } = require("mongoose");

const pokeSchema = new Schema({
  pokeName: String,
  pokeTypes: [],
  pokeImg: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Pokemon", pokeSchema, "pokemons");
