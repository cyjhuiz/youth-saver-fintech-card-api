const express = require("express");

const { getAllCards, getCardByID } = require("../controllers/card-controllers");

const router = express.Router();

router.get("/", getAllCards);

router.get("/:cardID", getCardByID);

module.exports = router;
