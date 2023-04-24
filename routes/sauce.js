const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");


//----New----Sauce----
router.post("/api/sauces", auth, multer, sauceCtrl.createSauce);

//----Update----Sauce----
router.put("/api/sauces/:id", auth, multer, sauceCtrl.modifySauce);

//----Delete----Sauce----
router.delete("/api/sauces/:id", auth, sauceCtrl.deleteSauce);

//----Get----All----Sauces----
router.get("/api/sauces", auth, sauceCtrl.getAllSauces);

//----Get----One----Sauce----
router.get("/api/sauces/:id", auth, sauceCtrl.getOneSauce);

//----Update----LIKES----for----Sauce----
router.post("/api/sauces/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;