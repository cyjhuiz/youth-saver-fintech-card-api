const Card = require("../models/card");

const { sequelize } = require("../util/database");

const HttpError = require("../models/http-error");

const getAllCards = async (req, res, next) => {
  let cards;
  try {
    cards = await Card.findAll();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find cards.",
      500
    );
    return next(error);
  }

  return res.status(200).json({
    code: 200,
    cards: cards,
  });
};

const getCardByID = async (req, res, next) => {
  const cardID = req.params.cardID;
  let card;
  try {
    card = await Card.findByPk(cardID);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find card",
      500
    );
    return next(error);
  }

  if (!card) {
    const error = new HttpError(
      "Could not find user card using id provided",
      404
    );
    return next(error);
  }

  return res.status(200).json({
    code: 200,
    card: card,
  });
};

exports.getAllCards = getAllCards;
exports.getCardByID = getCardByID;
