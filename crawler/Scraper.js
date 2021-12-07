const puppeteer = require("puppeteer");
const { InsertProduct, SelectProducts } = require("./api");

module.exports = async (Spider) => {
  let maxPagesToCrawl = 2000;
  let crawledUrls = [];
  let dbUrls = [];
  let checkedUrls = [];

  /* headless browser configs */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
  );

  /* gets database urls */
  try {
    dbUrls = await SelectProducts({ store: Spider.getStore() });
    dbUrls = dbUrls.map((row) => row.url);
    console.log(dbUrls.length, " mapped urls from the database");
  } catch (error) {
    console.log("db mapped urls error: \n", error.message);
  }

  /* crawler and scraper */
  async function crawler(spiderInstance, urlIn) {
    await page.goto(urlIn);

    /* gets all urls from the page */
    crawledUrls = await page.$$eval("a", (assetLinks) =>
      assetLinks.map((link) => link.href)
    );

    console.log(crawledUrls.length, " crawled urls on ", urlIn);

    for (let crawledUrl of crawledUrls) {
      // console.log('Spider idx', spiderInstance.getIndex())
      // console.log('Spider list size',spiderInstance.getUrlsToAccessLength())

      /* sets url to crawl if it's not in the list yet and and matches the regex of interest */
      if (
        spiderInstance.notInUrlsToAccess(crawledUrl) &&
        new RegExp(spiderInstance.getRegexPagesToCrawl()).test(crawledUrl)
      ) {
        spiderInstance.setUrlToAccess(crawledUrl);
      }
    }

    /* scrapes if it's a product and it's not in the database yet */
    if (
      new RegExp(spiderInstance.getRegexProducts()).test(urlIn) &&
      dbUrls.indexOf(urlIn) == -1
    ) {
      try {
        let title = await page.evaluate(spiderInstance.getTitleSelector());
        let price = await page.evaluate(spiderInstance.getPriceSelector());

        if (title && price) {
          await InsertProduct({
            url: urlIn,
            title: title,
            price: price,
            store: spiderInstance.getStore(),
          });

          /* adds the scraped url to the list not to crawl it */
          dbUrls.push(urlIn);
        }
      } catch (error) {
        console.log("Did not insert. Error: ", error.message);
      }
    }
    
    spiderInstance.incrementIndex();

    /* tests if there are more pages to crawl */
    if (
      spiderInstance.getUrlsToAccessLength() > spiderInstance.getIndex() &&
      spiderInstance.getIndex() < maxPagesToCrawl
    ) {
      return crawler(spiderInstance, spiderInstance.getNextUrl());
    }
  }

  await crawler(Spider, Spider.getInitialPage());

  browser.close();
};
