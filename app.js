//Import des modules Express et Mongoose
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Connect mongoose
mongoose
  .connect(
    "mongodb+srv://johndoe:admin@piiquante.aeuww2a.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

app.use(express.json());

module.exports = app;
