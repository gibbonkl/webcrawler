const express = require("express");
const pages = require("./ScrapperRoute");

module.exports = (app) => {
  app.use(express.json());
  app.use(pages);
};
