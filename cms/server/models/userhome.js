"use strict";
const { Model } = require("sequelize");
const { User } = require("./user.js")
module.exports = (sequelize, DataTypes) => {
  class UserHome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const A = sequelize.define(User)
      const B = sequelize.define(UserHome);

      A.belongsToMany(B, { through: "C" }); // A BelongsToMany B through the junction table C
    }
  }
  UserHome.init(
    {
      adress: DataTypes.STRING,
      adress2: DataTypes.STRING,
      zip: DataTypes.INTEGER,
      town: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserHome",
    }
  );
  return UserHome;
};
