const express = require("express");

const {
  getAllUserCardsByUserID,
  getUserCardByID,
  createUserCard,
  fetchCardDetails,
  updateUserCardByID,
  deleteUserCardByID,
} = require("../controllers/card-controllers");

const router = express.Router();

router.get("/", getAllUserCardsByUserID);

router.get("/:userCardID", getUserCardByID);

router.post("/", createUserCard);

router.post("/cardDetails", fetchCardDetails);

router.put("/:userCardID", updateUserCardByID);

router.delete("/:userCardID", deleteUserCardByID);

module.exports = router;
