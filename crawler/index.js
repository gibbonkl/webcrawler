const { readdir } = require("fs");
const scrapper = require("./Scrapper");
const updater = require("./Updater");

dirname = "/home/deb";

readdir(`${dirname}/webcrawler/crawler/implementations`, (err, files) => {
  if (err) throw err;

  files.forEach(function (path) {
    const Spider = require(`./implementations/${path}`);

    scrapper(new Spider());
    //updater(new Spider());
  });
});