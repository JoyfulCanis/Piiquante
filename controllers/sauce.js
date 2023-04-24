const Sauce = require("../models/Sauce");
const fs = require("fs");


//----Create----Sauce----
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
  
    sauce
      .save()
      .then(() => {
        res.status(201).json({ message: "Object Saved !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };


  
//----Update----Sauce----
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        }
      : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
          res.status(403).json({ message: "Unauthorized Request !" });
        } else {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Object Modified !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

//----Delete----Sauce----

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
          res.status(403).json({ message: "Unauthorized Request !" });
        } else {
          const filename = sauce.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: "Object Deleted !" });
              })
              .catch((error) => res.status(401).json({ error }));
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };

//----Get----ONE----Sauce----
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({error}));
};

//----Get----ALL----Sauces----

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({error}));
};



//----Update----LIKES----for----Sauce----
exports.likeSauce = (req, res, next) => {
    const sauceId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;

    Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
        if (!sauce) {
          return res.status(404).json({ message: "Missing Object !" });
        }

        // Récupère l'index de l'userId dans le tableau usersLiked et usersDisliked
        const userLikeIndex = sauce.usersLiked.indexOf(userId);
        const userDislikeIndex = sauce.usersDisliked.indexOf(userId);

        // Si l'utilisateur a like
        if (like === 1) {
          if (userLikeIndex === -1) {
            sauce.usersLiked.push(userId);
          }
          if (userDislikeIndex !== -1) {
            sauce.usersDisliked.splice(userDislikeIndex, 1);
          }
        }  // Si l'utilisateur a dislike
        else if (like === -1) {
          if (userDislikeIndex === -1) {
            sauce.usersDisliked.push(userId);
          }
          if (userLikeIndex !== -1) {
            sauce.usersLiked.splice(userLikeIndex, 1);
          }
        } 
        // L'utilisateur a retiré son like ou son dislike
        else {
          if (userLikeIndex !== -1) {
            sauce.usersLiked.splice(userLikeIndex, 1);
          }
          if (userDislikeIndex !== -1) {
            sauce.usersDisliked.splice(userDislikeIndex, 1);
          }
        }
        //Mise à jour des valeurs
        sauce.likes = sauce.usersLiked.length;
        sauce.dislikes = sauce.usersDisliked.length;

        sauce
          .save()
          .then(() => {
            res.status(200).json({message: "Object Updated !"});
          })
          .catch((error) => {
            res.status(400).json({error});
          });
      })
      .catch((error) => {
        res.status(500).json({error});
      });
  };