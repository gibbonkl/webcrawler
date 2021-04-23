const { readdir } = require("fs");
const scrapper = require("./scrapper");

dirname = "C:/Users/karolina.gibbon/Documents/Git";

readdir(
  `${dirname}/webcrawler/node_proj/crawler/implementations`,
  (err, files) => {
    if (err) throw err;

    files.forEach(function (path) {
      const Spider = require(`./implementations/${path}`);

      scrapper(new Spider());
    });
  }
);
