const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../Conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//This section will help you get a list of all the records.
recordRoutes.route("/myPokedex").get(function (req, res) {
  let db_connect = dbo.getDb("Pokemon");
  db_connect
    .collection("MyPokedex")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/allPokemon").post(function (req, response) {
  let db_connect = dbo.getDb();
  let name = req.body.pokeName;
  let types = req.body.pokeTypes;
  let url = req.body.pokeImg;

  let myobj = {
    pokeName: name,
    pokeTypes: types,
    pokeImg: url,
  };

  db_connect.collection("MyPokedex").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you delete a record
recordRoutes.route("/myPokedex/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("MyPokedex").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("Vous avez supprimé un pokemon de votre Pokedex !");
    response.json(obj);
  });
});

// This section will help you delete a record
recordRoutes.route("/myPokedex").delete((req) => {
  let db_connect = dbo.getDb();
  db_connect.collection("MyPokedex").deleteMany();
});

module.exports = recordRoutes;
