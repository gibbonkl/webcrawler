const puppeteer = require("puppeteer");
const Kabum = require("./Kabum");
const Pichau = require("./Pichau");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
  );

  let limitCrawledPages = 5;
  let crawledUrls = [];

  async function getUrls(obj, urlIn) {
    await page.goto(urlIn);

    crawledUrls = await page.$$eval("a", (assetLinks) =>
      assetLinks.map((link) => link.href)
    );

    for (let crawledUrl of crawledUrls) {
      if (
        new RegExp(obj.getRegexPagesOfInterest()).test(crawledUrl) &&
        obj.notInSelectedUrls(crawledUrl)
      )
        obj.setSelectedUrl(crawledUrl);
    }

    if (
      new RegExp(obj.getRegexProducts()).test(urlIn) &&
      obj.notInSelectedUrls(urlIn)
    ) {
      try {
        let title = await page.evaluate(obj.getTitleSelector());
        let price = await page.evaluate(obj.getPriceSelector());

        if (title && price) {
          obj.setData([title, price, urlIn]);
          obj.setProductUrl(urlIn);
        } else obj.setUnwatedUrl(urlIn);
      } catch (error) {}
    }

    obj.incrementIndex();

    if (
      obj.getSelectedUrlsLength() > obj.getIndex() &&
      obj.getIndex() < limitCrawledPages
    ) {
      return getUrls(obj, obj.getNextUrl());
    }
  }

  //const website = new Kabum();
  const website = new Pichau();

  await getUrls(website, website.getInitialPage());

  browser.close();
})();
