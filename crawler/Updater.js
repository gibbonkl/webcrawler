const puppeteer = require("puppeteer");
const { InsertProduct, SelectProducts } = require("./api");

module.exports = async (Spider) => {
  let dbUrls = [];
  
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
    console.log("db mapped urls error: \n",error.message);
  }

  /* record updater */
  async function updater(spiderInstance, urlIn) {
    await page.goto(urlIn);

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
      }
    } catch (error) {
      console.log("Did not insert. Error: ", error.message);
    }
  }
  
  for (let url of dbUrls) {
    await updater(Spider, url);
  }
  
  browser.close();
};
