const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//*En commentaire, l'import de dotenv pour assurer l'autre moyen de récupération de la clé du token
// const dotenv = require("dotenv");
// dotenv.config();

//! Importing key retrieval function !//
const { getSecretKey } = require("../config");


// Signing up POST
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User Created !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
//Login POST
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({
            message: "La combinaison login/mot de passe est incorrecte.",
          });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(async (valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({
                message: "La combinaison login/mot de passe est incorrecte.",
              });
          }
          //! Récupération de la clé depuis MongoDB !//
          const secretKey = await getSecretKey();
          if (!secretKey) {
            res.status(500).json({ error: "Unable to retrieve secret key" });
            return;
          }
          //! Récupération de la clé depuis MongoDB FIN !//
          
          res.status(200).json({
            userId: user._id,

            //*En commentaire, un autre moyen de récupération de la clé secrète. Elle remplace nécessairement la méthode MongoDB
            //   token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {

            token: jwt.sign({ userId: user._id }, secretKey, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};





