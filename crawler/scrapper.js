const puppeteer = require("puppeteer");
const models = require("../api/models");

module.exports = async (Spider) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
  );

  let limitCrawledPages = 1;
  let crawledUrls = [];
  let mappedUrls;

  try {
    mappedUrls = await models.ScrappingPages.findAll({
      where: { website: String(Spider.getWebsite()) },
      raw: true,
    });

    mappedUrls = mappedUrls.map((i) => i.url);
  } catch (error) {
    console.log(error.message);
  }

  async function getUrls(obj, urlIn) {
    //condição adicionada para separar updater
    if (mappedUrls.indexOf(urlIn) == -1) {
      await page.goto(urlIn);

      crawledUrls = await page.$$eval("a", (assetLinks) =>
        assetLinks.map((link) => link.href)
      );

      for (let crawledUrl of crawledUrls) {
        if (
          new RegExp(obj.getRegexPagesOfInterest()).test(crawledUrl) &&
          obj.notInSelectedUrls(crawledUrl) &&
          mappedUrls.indexOf(crawledUrl) == -1 //adicionada para separar updater
        )
          obj.setSelectedUrl(crawledUrl);
      }

      if (
        new RegExp(obj.getRegexProducts()).test(urlIn)
        //&& obj.notInSelectedUrls(urlIn)
      ) {
        try {
          let title = await page.evaluate(obj.getTitleSelector());
          let price = await page.evaluate(obj.getPriceSelector());

          if (title && price) {
            obj.setData([urlIn, title, price, obj.getWebsite()]);
            obj.setProductUrl(urlIn);
          } else obj.setUnwatedUrl(urlIn);
        } catch (error) {
          //console.log(error.message); //Evaluation failed: TypeError: Cannot read property 'textContent' of null
        }
      }
    }

    obj.incrementIndex();

    if (
      obj.getSelectedUrlsLength() > obj.getIndex() &&
      obj.getIndex() < limitCrawledPages
    ) {
      return getUrls(obj, obj.getNextUrl());
    }
  }

  await getUrls(Spider, Spider.getInitialPage());

  browser.close();

  try {
    Spider.getData().forEach((element) => {
      models.ScrappingPages.create({
        url: `${element[0]}`,
        title: `${element[1]}`,
        price: `${element[2]}`,
        website: `${element[3]}`,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
