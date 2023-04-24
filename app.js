//Import des modules Express et Mongoose
const express = require("express");
const mongoose = require("mongoose");

//---------[DEBUT]-------Utilisation unique, à supprimer ensuite-----[DEBUT]-------------
const crypto = require("crypto");
const SECRET_KEY = crypto.randomBytes(64).toString("hex");
//Chargement de la variable d'environnement
require("dotenv").config();
console.log("TS IS", SECRET_KEY);
//----------[FIN]------Utilisation unique, à supprimer ensuite-------[FIN]-----------

const app = express();

//Connect to Mongoose
mongoose
  .connect(
    "mongodb+srv://johndoe:admin@piiquante.aeuww2a.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

app.use(express.json());

//Middleware permettant d'éviter les conflits CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
















module.exports = app;
