"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ScrappingPages",
      [
        {
          url: "www.teste1.com",
          website: "teste1",
          title: "teste1",
          price: "",
          description: "",
          category: "",
          createdAt: new Date(),
        },
        {
          url: "www.teste2.com",
          website: "teste2",
          title: "teste2",
          price: "",
          description: "",
          category: "",
          createdAt: new Date(),
        },
        {
          url: "www.teste3.com",
          website: "teste3",
          title: "teste3",
          price: "",
          description: "",
          category: "",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ScrappingPages", null, {});
  },
};
