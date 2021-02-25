const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  // entry -> inicial page to start crawling
  let inicialPage = "https://www.pichau.com.br";
  // entry -> page level do crawl
  let maxPageLevel = "7";

  let selectedUrls = [];
  let crawledUrls = [];
  let index = -1;

  // crawling function to gather urls
  async function getUrls(urlIn) {
    await page.goto(urlIn);

    // gather all urls of the page
    crawledUrls = await page.$$eval("a", (assetLinks) =>
      assetLinks.map((link) => link.href)
    );

    // selecting urls of interest
    for (let crawledUrl of crawledUrls) {
      // regex to control the crawling
      let reg = new RegExp(
        "https://www.pichau.com.br" + "(/[^#/]+){0," + maxPageLevel + "}/?$"
      );

      // only gets new matching pages
      if (reg.test(crawledUrl) && selectedUrls.indexOf(crawledUrl) < 0)
        selectedUrls.push(crawledUrl);
    }

    // interaction increment
    index++;

    // call recursion if a url of interest wasn't crawled yet
    //setting a max index limits how many pages will be crawled
    if (selectedUrls.length > index && index < 2)
      return getUrls(selectedUrls[index]);
  }

  await getUrls(inicialPage);

  console.log(selectedUrls);
  console.log("Pages crawled: " + index);

  browser.close();
})();
