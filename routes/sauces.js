const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");


//----New----Sauce----
router.post("/", auth, multer, sauceCtrl.createSauce);

//----Update----Sauce----
router.put("/:id", auth, multer, sauceCtrl.modifySauce);

//----Delete----Sauce----
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//----Get----All----Sauces----
router.get("/", auth, sauceCtrl.getAllSauces);

//----Get----One----Sauce----
router.get("/:id", auth, sauceCtrl.getOneSauce);

//----Update----LIKES----for----Sauce----
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;