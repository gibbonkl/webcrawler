const { readdir } = require("fs");
const scraper = require("./Scraper");
const updater = require("./Updater");

dirname = "/home/deb";

readdir(`${dirname}/webcrawler/crawler/implementations`, (err, files) => {
  if (err) throw err;

  files.forEach(function (path) {
    const Spider = require(`./implementations/${path}`);

    scraper(new Spider());
    //updater(new Spider());
  });
});