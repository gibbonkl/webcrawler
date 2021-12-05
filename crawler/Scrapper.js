const puppeteer = require("puppeteer");
//const models = require("../api/models");
const InsertProduct = require("./api");

module.exports = async (Spider) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
  );

  let limitCrawledPages = 200;
  let crawledUrls = [];
  /*let mappedUrls;

  try {
    mappedUrls = await SelectProducts({ website: Spider.getWebsite(), });
    mappedUrls = mappedUrls.map((i) => i.url);
    console.log("URLS MAPEADAS: /n",mappedUrls);
  } catch (error) {
    console.log(error.message);
  }*/

  async function getUrls(spiderInstance, urlIn) {
    //test if the url is already in the database
    if (true/*mappedUrls.indexOf(urlIn) == -1*/) {
      await page.goto(urlIn);

      crawledUrls = await page.$$eval("a", (assetLinks) =>
        assetLinks.map((link) => link.href)
      );

      for (let crawledUrl of crawledUrls) {
        /*
         * tests if it's a page of interest
         * if it's not in the list of selected urls to crawl
         * if it's not in the database
         * if all true then insets in the list of pages to crawl
         */
        if (
          new RegExp(spiderInstance.getRegexPagesOfInterest()).test(crawledUrl) &&
          spiderInstance.notInUrlsToAccess(crawledUrl) //&& mappedUrls.indexOf(crawledUrl) == -1
        )
          spiderInstance.setUrlToAccess(crawledUrl);

        //tests if it's a product url
        if (new RegExp(spiderInstance.getRegexProducts()).test(urlIn)) {
          try {
            let title = await page.evaluate(spiderInstance.getTitleSelector());
            let price = await page.evaluate(spiderInstance.getPriceSelector());

            if (title && price) {
              await InsertProduct({
                url: urlIn,
                title: title,
                price: price,
                website: spiderInstance.getWebsite(),
              });
            } else {
              console.log("\tMarked as unwanted: ", urlIn);
              spiderInstance.setUnwatedUrl(urlIn);
            }
          } catch (error) {
            console.log("\tMarked as unwanted with error", error.message);
            spiderInstance.setUnwatedUrl(urlIn);
          }
        }
      }
    }
    //increments to go to the next page
    spiderInstance.incrementIndex();

    //tests if it's a product url and if the limit of pages to crawls was reached
    if (
      spiderInstance.getUrlsToAccessLength() > spiderInstance.getIndex() &&
      spiderInstance.getIndex() < limitCrawledPages
    ) {
      //recursive call
      return getUrls(spiderInstance, spiderInstance.getNextUrl());
    }
  }

  await getUrls(Spider, Spider.getInitialPage());

  browser.close();
  
};
