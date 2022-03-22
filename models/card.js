const { INTEGER, STRING } = require("sequelize");

const { sequelize } = require("../util/database");

const sequelizeConfig = { timestamps: false };

const Card = sequelize.define(
  "card",
  {
    cardID: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    cardName: {
      type: STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardType: {
      type: STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardLifeDurationInYears: {
      type: INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
    cardImageUrl: {
      type: STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: false,
    },
  },
  sequelizeConfig
);

module.exports = Card;
