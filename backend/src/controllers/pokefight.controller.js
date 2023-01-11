const User = require("../models/User.model");
const { FifoMatchmaker } = require("matchmaking");

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

// Start the matchmaking
const matchmaking = async (req, res) => {
  try {
    const username = req.user.username;
    const isReady = req.body.isReady;

    const user1 = await User.findOneAndUpdate(
      { username: username },
      { isReady: isReady },
      { new: true }
    );

    console.log(user1);

    const user2 = await User.aggregate([
      { $match: { isReady: true, username: { $ne: username } } },
      { $sample: { size: 1 } },
    ]);
    if (!user2[0]) return res.status(404).send("No ready player found");

    // user2 = user2[0];

    function getPlayerKey(player) {
      return player._id;
    }

    let mm = new FifoMatchmaker(runGame, getPlayerKey, { checkInterval: 2000 });

    let player1 = user1;
    let player2 = user2[0];

    mm.push(player1);
    mm.push(player2);
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

// this function run the battle
async function runGame(players) {
  console.log("Game started with:");
  console.log(players);

  let player1Pokemons = [];
  let player2Pokemons = [];
  let fetchPromiseArray = [];

  players.forEach(async (player, index) => {
    player.PokeFight.forEach(async (pokemon) => {
      fetchPromiseArray.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then((res) => res.json())
          .then((pokeData) => {
            if (index === 0) player1Pokemons.push(pokeData);
            else player2Pokemons.push(pokeData);
          })
          .catch((err) => console.log(err))
      );
    });
  });

  Promise.all(fetchPromiseArray).then(async () => {
    let i = 0,
      j = 0;
    while (player1Pokemons.length > i && player2Pokemons.length > j) {
      let attacker = player1Pokemons[i];
      let defender = player2Pokemons[j];

      let level = 100;
      let modifier = 0.84;

      // Player 1 Pokemon attack
      const attackPower = attacker.stats.find(
        (stat) => stat.stat.name === "attack"
      ).base_stat;
      const defensePower = defender.stats.find(
        (stat) => stat.stat.name === "defense"
      ).base_stat;
      let damage = Math.floor(
        (((2 * level) / 5 + 2) * attackPower * modifier) / defensePower
      );

      // Player 2 Pokemon attack
      const attackPower2 = defender.stats.find(
        (stat) => stat.stat.name === "attack"
      ).base_stat;
      const defensePower2 = attacker.stats.find(
        (stat) => stat.stat.name === "defense"
      ).base_stat;
      let damage2 = Math.floor(
        (((2 * level) / 5 + 2) * attackPower2 * modifier) / defensePower2
      );

      // Player 1 Pokemon attack Player 2 Pokemon
      defender.stats[0].base_stat -= damage;
      if (defender.stats[0].base_stat <= 0) {
        console.log(`${defender.name} has fainted`);
        player2Pokemons.splice(j, 1);
      } else {
        console.log(
          `${attacker.name} has attacked ${defender.name} and dealt ${damage} damage. ${defender.name} now has ${defender.stats[0].base_stat} hp left.`
        );

        // Player 2 Pokemon attack Player 1 Pokemon
        attacker.stats[0].base_stat -= damage2;
        if (attacker.stats[0].base_stat <= 0) {
          console.log(`${attacker.name} has fainted`);
          player1Pokemons.splice(i, 1);
        } else {
          console.log(
            `${defender.name} has attacked ${attacker.name} and dealt ${damage2} damage. ${attacker.name} now has ${attacker.stats[0].base_stat} hp left.`
          );
        }
      }

      if (i == player1Pokemons.length - 1 && j == player2Pokemons.length - 1) {
        break;
      }
    }

    // Give who wins
    if (player1Pokemons.length === 0) {
      console.log("Player 2 wins!");
      // Set both players to isReady : false
      for (const player of players) {
        await User.updateOne({ username: player.username }, { isReady: false });
      }
    } else {
      console.log("Player 1 wins!");
      // Set both players to isReady : false
      for (const player of players) {
        await User.updateOne({ username: player.username }, { isReady: false });
      }
    }
  });
}

module.exports = {
  teamFighter,
  matchmaking,
};
