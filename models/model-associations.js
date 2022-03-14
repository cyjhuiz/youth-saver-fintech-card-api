const { sequelize } = require("../util/database");
const Card = require("./card");
const UserCard = require("./user-card");

const createCardAssociations = () => {
  UserCard.belongsTo(Card, { foreignKey: "cardID" });
  Card.hasMany(UserCard, { as: "card", foreignKey: "cardID" });
  sequelize.sync({ alter: true });
};

exports.createCardAssociations = createCardAssociations;
