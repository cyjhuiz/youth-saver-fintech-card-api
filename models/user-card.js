// Card (cardID, userID, cardFirstName, cardLastName, cardNumber, cardCvcNumber, cardExpiry,  associatedAccountID, creditLimit, isActivated)

const { INTEGER, STRING, FLOAT, BOOLEAN } = require("sequelize");

const { sequelize } = require("../util/database");

const sequelizeConfig = { timestamps: false };

const UserCard = sequelize.define(
  "usercard",
  {
    userCardID: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userID: {
      type: INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardID: {
      type: INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardFirstName: {
      type: STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardLastName: {
      type: STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardNumber: {
      type: STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardCvcNumber: {
      type: STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardExpiry: {
      type: STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    associatedAccountID: {
      type: INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    creditLimit: {
      type: FLOAT,
      autoIncrement: false,
      allowNull: true,
      primaryKey: false,
    },
    isActivated: {
      type: BOOLEAN,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
  },
  sequelizeConfig
);

module.exports = UserCard;
