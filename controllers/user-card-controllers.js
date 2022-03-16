const Card = require("../models/card");
const UserCard = require("../models/user-card");

const { createCardAssociations } = require("../models/model-associations");
createCardAssociations();

const { sequelize } = require("../util/database");

const {
  generateCardNumber,
  generateCardExpiry,
  generateCardCvcNumber,
  generateCreditLimit,
  convertInputCardExpiryToISOString,
} = require("../util/user-card-util");

const HttpError = require("../models/http-error");

const getAllUserCardsByUserID = async (req, res, next) => {
  const userID = req.query.userID;
  let userCards;
  try {
    userCards = await UserCard.findAll({
      where: {
        userID: userID,
      },
      raw: true,
      attributes: {
        include: [
          sequelize.col("card.cardName", "cardName"),
          sequelize.col("card.cardType", "cardType"),
        ],
      },
      include: [
        {
          model: Card,
          attributes: [],
        },
      ],
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user cards.",
      500
    );
    return next(error);
  }

  return res.status(200).json({
    code: 200,
    userCards: userCards,
  });
};

const getUserCardByID = async (req, res, next) => {
  const userCardID = req.params.userCardID;
  let userCard;
  try {
    userCard = await UserCard.findOne({
      where: {
        userCardID: userCardID,
      },
      raw: true,
      attributes: {
        include: [
          sequelize.col("card.cardName", "cardName"),
          sequelize.col("card.cardType", "cardType"),
        ],
      },
      include: [
        {
          model: Card,
          attributes: [],
        },
      ],
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user card",
      500
    );
    return next(error);
  }

  if (!userCard) {
    const error = new HttpError(
      "Could not find user card using id provided",
      404
    );
    return next(error);
  }

  return res.status(200).json({
    code: 200,
    userCard: userCard,
  });
};

const createUserCard = async (req, res, next) => {
  const { userID, cardFirstName, cardLastName, cardID, associatedAccountID } =
    req.body;

  // get card scheme details using card ID, to generate userCard
  let card;
  try {
    card = await Card.findByPk(cardID, { raw: true });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not get card scheme details",
      500
    );
    return next(error);
  }

  if (!card) {
    const error = new HttpError("Card scheme cannot be found", 404);
    return next(error);
  }

  const { cardLifeDurationInYears } = card;

  let userCard;
  try {
    userCard = await UserCard.create({
      userID: userID,
      cardID: cardID,
      cardFirstName: cardFirstName,
      cardLastName: cardLastName,
      cardNumber: generateCardNumber(),
      cardCvcNumber: generateCardCvcNumber(),
      cardExpiry: generateCardExpiry(cardLifeDurationInYears),
      associatedAccountID: associatedAccountID,
      creditLimit: generateCreditLimit(cardID),
      isActivated: false,
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create user card",
      500
    );
    return next(error);
  }

  return res.status(201).json({
    code: 201,
    userCardID: userCard.userCardID,
  });
};

const fetchCardDetails = async (req, res, next) => {
  const { cardFirstName, cardLastName, cardNumber, cardExpiry, cardCvcNumber } =
    req.body;

  let userCard;
  try {
    userCard = await UserCard.findOne({
      where: {
        cardFirstName,
        cardLastName,
        cardNumber,
        cardExpiry: convertInputCardExpiryToISOString(cardExpiry),
        cardCvcNumber,
      },
      raw: true,
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not fetch user card details",
      500
    );
    return next(error);
  }

  if (!userCard) {
    const error = new HttpError(
      "User card does not exist or input card details are invalid",
      404
    );
    return next(error);
  }

  return res.status(200).json({ userCard });
};

const updateUserCardByID = async (req, res, next) => {
  const userCardID = req.params.userCardID;

  let userCard;
  try {
    userCard = await UserCard.findByPk(userCardID);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user card details",
      500
    );
    return next(error);
  }

  if (!userCard) {
    const error = new HttpError("User card being updated does not exist", 404);
    return next(error);
  }

  const immutableAttributesArray = ["userCardID", "userID", "cardID"];
  for (key in req.body) {
    const keyExists = typeof userCard.getDataValue(key) !== undefined;
    const keyIsMutable = immutableAttributesArray.includes(key) === false;
    if (keyExists && keyIsMutable) {
      const value = req.body[key];
      userCard.setDataValue(key, value);
    }
  }

  try {
    await userCard.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user card",
      500
    );
    return next(error);
  }

  return res.status(200).json({
    userCardID: userCardID,
  });
};

const deleteUserCardByID = async (req, res, next) => {
  const userCardID = req.params.userCardID;

  let userCard;
  try {
    userCard = await UserCard.findByPk(userCardID);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user card",
      500
    );
    return next(error);
  }

  if (!userCard) {
    const error = new HttpError("User card being deleted does not exist", 404);
    return next(error);
  }

  try {
    await userCard.destroy();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user card",
      500
    );
    return next(error);
  }

  return res.status(200).json({
    userCardID: userCardID,
  });
};

exports.getAllUserCardsByUserID = getAllUserCardsByUserID;
exports.getUserCardByID = getUserCardByID;
exports.createUserCard = createUserCard;
exports.fetchCardDetails = fetchCardDetails;
exports.updateUserCardByID = updateUserCardByID;
exports.deleteUserCardByID = deleteUserCardByID;
