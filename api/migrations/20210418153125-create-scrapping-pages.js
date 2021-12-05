"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ScrappingPages", {
      url: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      description: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ScrappingPages");
  },
};
