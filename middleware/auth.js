const jwt = require("jsonwebtoken");

//*En commentaire, l'import de dotenv pour assurer l'autre moyen de récupération de la clé du token
// const dotenv = require("dotenv");
// dotenv.config();

//! Importing key retrieval function! !//
const { getSecretKey } = require("../config");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //! Retrieving key from MongoDB !//
    const secretKey = await getSecretKey();
    if (!secretKey) {
      res.status(500).json({ error: "Unable to retrieve key" });
      return;
    }
    //! Retrieving key from MongoDB !//

    //*En commentaire, un autre moyen de récupération de la clé secrète. Elle remplace nécessairement la méthode MongoDB
    //const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};
