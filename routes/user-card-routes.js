const express = require("express");

const {
  getAllUserCardsByUserID,
  getUserCardByID,
  createUserCard,
  fetchCardDetails,
  updateUserCardByID,
  updateUserCard,
  deleteUserCardByID,
} = require("../controllers/user-card-controllers");

const router = express.Router();

router.get("/userCard", getAllUserCardsByUserID);

router.get("/userCard/:userCardID", getUserCardByID);

router.post("/userCard", createUserCard);

router.post("/userCard/cardDetails", fetchCardDetails);

router.put("/userCard/:userCardID", updateUserCardByID);

router.put("/userCard", updateUserCard);

router.delete("/userCard/:userCardID", deleteUserCardByID);

module.exports = router;
