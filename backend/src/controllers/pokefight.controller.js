const User = require("../models/User.model");
const Fifo = require("matchmaking");
const { use } = require("../routes/pokemon.route");

// Composition of Pokemon for combat
const teamFighter = async (req, res) => {
  try {
    const username = req.user.username;
    const PokeFight = req.body.PokeFight;

    const userFight = await User.findOne(
      { username },
      { username: 1, PokeFight: 1 }
    );

    let array = userFight.PokeFight;

    if (array.includes(PokeFight)) return;

    if (array.length > 4) return;

    userFight.PokeFight.push(PokeFight);

    await userFight.save();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une Erreur est survenue");
  }
};

const readyToFight = async (req, res) => {
  try {
    const username = req.user.username;
    const isReady = req.body.isReady;

    const userReady = await User.findOne(
      { username },
      { username: 1, isReady: 1, PokeFight: 1 }
    );

    console.log(isReady);
    userReady.isReady = isReady;

    await userReady.save();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const matchmaking = async (req, res) => {
  try {
    const username = req.user.username;

    const user1 = await User.findOne({ username });

    const user2 = await User.aggregate([
      { $match: { isReady: true, username: { $ne: username } } },
      { $sample: { size: 1 } },
    ]);
    if (!user2[0]) return res.status(404).send("No ready player found");

    user2 = user2[0];

    let mm = new FifoMatchmaker(runGame, { checkInterval: 2000 });

    let player1 = user1.username;
    let player2 = user2.username;

    mm.push(player1);
    mm.push(player2);
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

function runGame(players) {
  console.log("Game started with:");
  console.log(players);

  let player1 = players[0];
  let player2 = players[1];
}

module.exports = {
  teamFighter,
  readyToFight,
  matchmaking,
};
