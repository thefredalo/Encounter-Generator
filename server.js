// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock data for monsters and loot
const monsters = [
  { name: "Goblin", hitPoints: 7, challengeRating: 1 },
  { name: "Orc", hitPoints: 15, challengeRating: 2 },
  { name: "Dragon", hitPoints: 200, challengeRating: 15 }
];

const loot = ["Gold Coin", "Magic Sword", "Potion of Healing"];

// GET /encounters endpoint
app.get("/encounters", (req, res) => {
  const challengeRating = parseInt(req.query.challengeRating) || 1;
  const environment = req.query.environment || "forest";
  const partySize = parseInt(req.query.partySize) || 1;

  // Generate a random encounter based on challenge rating
  const encounterMonsters = monsters.filter(
    (monster) => monster.challengeRating <= challengeRating
  );

  const randomMonster = encounterMonsters[Math.floor(Math.random() * encounterMonsters.length)];
  const randomLoot = loot[Math.floor(Math.random() * loot.length)];

  const encounter = {
    id: new Date().getTime().toString(),
    monsters: [randomMonster],
    loot: [randomLoot],
    description: `You encounter a ${randomMonster.name} in the ${environment}.`
  };

  res.json(encounter);
});

// Start the server
app.listen(port, () => {
  console.log(`Encounter Generator API listening at http://localhost:${port}`);
});
