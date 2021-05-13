const { readdir } = require("fs");
const scrapper = require("./scrapper");
const scrapper_update = require("./scrapper_update");

dirname = "C:/Users/karolina.gibbon/Documents/Git";
/*
readdir(`${dirname}/webcrawler/crawler/implementations`, (err, files) => {
  if (err) throw err;

  files.forEach(function (path) {
    const Spider = require(`./implementations/${path}`);

    scrapper(new Spider());
  });
});
*/
readdir(`${dirname}/webcrawler/crawler/implementations`, (err, files) => {
  if (err) throw err;

  files.forEach(function (path) {
    const Spider = require(`./implementations/${path}`);

    scrapper_update(new Spider());
  });
});
