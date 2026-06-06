const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public")); // dossier pour index.html, style.css, script.js

// Connexion à la base SQLite
const db = new sqlite3.Database("./boutique.db");

// Créer la table si elle n’existe pas
db.run("CREATE TABLE IF NOT EXISTS commandes (id INTEGER PRIMARY KEY, article TEXT, prix REAL)");

// Route pour ajouter une commande
app.post("/commande", (req, res) => {
  const { article, prix } = req.body;
  db.run("INSERT INTO commandes (article, prix) VALUES (?, ?)", [article, prix], function(err) {
    if (err) {
      return res.status(500).send("Erreur lors de l’ajout");
    }
    res.send({ message: "Commande ajoutée", id: this.lastID });
  });
});

// Route pour afficher toutes les commandes
app.get("/commandes", (req, res) => {
  db.all("SELECT * FROM commandes", [], (err, rows) => {
    if (err) {
      return res.status(500).send("Erreur lors de la récupération");
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
