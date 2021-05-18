const { readdir } = require("fs");
const scrapper = require("./scrapper");
const updater = require("./updater");

dirname = "C:/Users/karolina.gibbon/Documents/Git";

readdir(`${dirname}/webcrawler/crawler/implementations`, (err, files) => {
  if (err) throw err;

  files.forEach(function (path) {
    const Spider = require(`./implementations/${path}`);

    scrapper(new Spider());
  });
});
/*
readdir(`${dirname}/webcrawler/crawler/implementations`, (err, files) => {
  if (err) throw err;

  files.forEach(function (path) {
    const Spider = require(`./implementations/${path}`);

    updater(new Spider());
  });
});
*/
