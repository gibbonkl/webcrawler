const puppeteer = require("puppeteer");
const Pichau = require("./Pichau");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64)" +
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36"
  );

  let limitCrawledPages = 50;
  let crawledUrls = [];
  let data = [];

  async function getUrls(object, urlIn) {
    await page.goto(urlIn);

    crawledUrls = await page.$$eval("a", (assetLinks) =>
      assetLinks.map((link) => link.href)
    );

    for (let crawledUrl of crawledUrls) {
      if (
        object.getRegex().test(crawledUrl) &&
        object.isInSelectedUrls(crawledUrl)
      )
        object.setSelectedUrl(crawledUrl);
    }

    let title;
    let price;

    try {
      title = await page.evaluate(
        () => document.querySelector(object.getTitleSelector()).textContent
      );

      price = await page.evaluate(() => {
        matches = document
          .querySelector(object.getPriceSelector())
          .textContent.match(/\$(.*),(.*)$/);
        return matches[1] + "." + matches[2];
      });

      category = await page.evaluate(
        () => document.querySelector(object.getCategorySelector()).textContent
      );
    } catch (error) {}

    data && price && category
      ? object.setData([category, title, price, urlIn])
      : object.SetUnwatedUrl(urlIn);

    object.IncrementIndex();
  }

  const pichau = new Pichau();

  await getUrls(pichau, pichau.getInitialPage());

  while (
    pichau.getSelectedUrlsNumber() > pichau.getIndex() &&
    pichau.getIndex() < limitCrawledPages
  ) {
    await getUrls(pichau.getNextUrl());
  }

  //coletado
  console.log(pichau.getSelectedUrlsNumber());
  console.log(pichau.getData());
  console.log(pichau.getUnwatedUrlsNumber());

  browser.close();
})();
