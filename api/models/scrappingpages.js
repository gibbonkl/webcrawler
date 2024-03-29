"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScrappingPages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  ScrappingPages.init(
    {
      url: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      store: DataTypes.STRING,
      title: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ScrappingPages",
    }
  );
  return ScrappingPages;
};
