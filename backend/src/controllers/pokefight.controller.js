const User = require("../models/User.model");
const GameResult = require("../models/GameResults.model");
const { FifoMatchmaker } = require("matchmaking");

// Set player to ready
const ready = async (req, res) => {
  try {
    const username = req.user.username;
    const PokeFight = req.body.PokeFight;
    const isReady = req.body.isReady;

    await User.findOneAndUpdate(
      { username: username },
      { isReady: isReady, PokeFight: PokeFight },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

// Start the matchmaking
const games = async (req, res) => {
  try {
    const username = req.user.username;

    const PokeFight = req.body.PokeFight;
    const isReady = req.body.isReady;

    const user = await User.findOneAndUpdate(
      { username: username },
      { isReady: isReady, PokeFight: PokeFight },
      { new: true }
    );

    const user2 = await User.aggregate([
      { $match: { isReady: true, username: { $ne: username } } },
      { $sample: { size: 1 } },
    ]);
    if (!user2[0])
      return res.status(404).send({ error: "No ready player found" });

    function getPlayerKey(player) {
      return player._id;
    }

    let mm = new FifoMatchmaker(runGame, getPlayerKey, { checkInterval: 2000 });

    let player = user;
    let player2 = user2[0];

    mm.push(player);
    mm.push(player2);
    console.log(mm);

    // this function run the battle
    async function runGame(players) {
      console.log("Game started with:");
      console.log(players[0].username);
      console.log(players[1].username);

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

        // Game Logic
        while (player1Pokemons.length > i && player2Pokemons.length > j) {
          let player1Teams = player1Pokemons[i];
          let player2Teams = player2Pokemons[j];

          let level = 100;
          let modifier = 0.84;

          // Player 1 Pokemon attack
          const attackPower = player1Teams.stats.find(
            (stat) => stat.stat.name === "attack"
          ).base_stat;
          const defensePower = player2Teams.stats.find(
            (stat) => stat.stat.name === "defense"
          ).base_stat;
          let damage = Math.floor(
            (((2 * level) / 5 + 2) * attackPower * modifier) / defensePower
          );

          // Player 2 Pokemon attack
          const attackPower2 = player2Teams.stats.find(
            (stat) => stat.stat.name === "attack"
          ).base_stat;
          const defensePower2 = player1Teams.stats.find(
            (stat) => stat.stat.name === "defense"
          ).base_stat;
          let damage2 = Math.floor(
            (((2 * level) / 5 + 2) * attackPower2 * modifier) / defensePower2
          );

          // Player 1 Pokemon attack Player 2 Pokemon
          player2Teams.stats[0].base_stat -= damage;
          if (player2Teams.stats[0].base_stat <= 0) {
            console.log(`${player2Teams.name} has fainted`);
            player2Pokemons.splice(j, 1);
          } else {
            console.log(
              `${player1Teams.name} has attacked ${player2Teams.name} and dealt ${damage} damage. ${player2Teams.name} now has ${player2Teams.stats[0].base_stat} hp left.`
            );

            // Player 2 Pokemon attack Player 1 Pokemon
            player1Teams.stats[0].base_stat -= damage2;
            if (player1Teams.stats[0].base_stat <= 0) {
              console.log(`${player1Teams.name} has fainted`);
              player1Pokemons.splice(i, 1);
            } else {
              console.log(
                `${player2Teams.name} has attacked ${player1Teams.name} and dealt ${damage2} damage. ${player1Teams.name} now has ${player1Teams.stats[0].base_stat} hp left.`
              );
            }
          }

          if (
            i == player1Pokemons.length - 1 &&
            j == player2Pokemons.length - 1
          ) {
            break;
          }
        }

        let result;
        // Give who wins
        if (player1Pokemons.length === 0) {
          console.log(`Player ${players[1].username} Wins !`);
          console.log(`Player ${players[0].username} Lose !`);

          // Update Winner & Loser data
          await User.findOneAndUpdate(
            { username: players[1].username },
            { $inc: { coins: 1 }, result: "gagner" }
          );
          await User.findOneAndUpdate(
            { username: players[0].username },
            { result: "perdu" }
          );

          result = `${players[1].username}`;

          // Set both players to isReady : false
          for (const player of players) {
            await User.updateOne(
              { username: player.username },
              { isReady: false, PokeFight: [] }
            );
          }
        } else {
          console.log(`Player ${players[0].username} Wins !`);
          console.log(`Player ${players[1].username} Lose !`);

          // Update Winner & Loser data
          await User.findOneAndUpdate(
            { username: players[0].username },
            { $inc: { coins: 1 }, result: "gagner" }
          );
          await User.findOneAndUpdate(
            { username: players[1].username },
            { result: "perdu" }
          );

          result = `${players[0].username}`;

          // Set both players to isReady : false
          for (const player of players) {
            await User.updateOne(
              { username: player.username },
              { isReady: false, PokeFight: [] }
            );
          }
        }

        const gameResult = new GameResult({
          players: [players[0].username, players[1].username],
          winner: result,
        });

        await gameResult.save();
        return result;
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const result = async (req, res) => {
  try {
    const username = req.user.username;

    await User.findOne({ username: username });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ready,
  games,
};
