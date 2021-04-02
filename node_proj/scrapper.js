const puppeteer = require("puppeteer");
const Kabum = require("./Kabum");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
  );

  let limitCrawledPages = 1;
  let crawledUrls = [];
  let data = [];

  async function getUrls(urlIn) {
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

    if (new RegExp(obj.getRegexProducts()).test(urlIn)) {
      try {
        let title = await page.evaluate(
          () => document.querySelector("h1").textContent
        );

        let price = await page.evaluate(
          () =>
            document
              .querySelector(".preco_traco")
              .textContent.match(/([0-9]+),([0-9]+)/)[0]
        );

        if (data && price) {
          obj.setData([title, price, urlIn]);
          obj.setProductUrl(urlIn);
        } else obj.setUnwatedUrl(urlIn);
      } catch (error) {}
    }
    obj.incrementIndex();
  }

  const obj = new Kabum();

  await getUrls(obj.getInitialPage());

  while (
    obj.getSelectedUrlsLength() > obj.getIndex() &&
    obj.getIndex() < limitCrawledPages
  ) {
    await getUrls(obj.getNextUrl());
  }

  browser.close();
})();
