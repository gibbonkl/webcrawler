const { readdir } = require("fs");
const Scraper = require("./Scraper");

dirname = "/home/deb";

readdir(`${dirname}/webcrawler/crawler/implementations`, (err, files) => {
  if (err) throw err;

  files.forEach(function (path) {
    const Spider = require(`./implementations/${path}`);

    const scraper = new Scraper(new Spider());
  });
});