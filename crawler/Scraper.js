const puppeteer = require("puppeteer");
const { InsertProduct, SelectProducts } = require("./api");

class Scraper {
  constructor(spiderInstance) {
    this.spiderInstance = spiderInstance;
    this.maxPagesToCrawl = 100;
    this.prods = 0;

    /* gets database urls */
    try {
      let dbUrls = (async () => { await SelectProducts({ store: this.spiderInstance.getStore() }); })();

      if (dbUrls.length > 0)
        dbUrls = dbUrls.forEach((row) =>
          this.spiderInstance.setUrlToAccess(row.url)
        );

      console.log(dbUrls.length, " mapped urls from the database");
    } catch (error) {
      console.log("db mapped urls error: \n", error.message);
    }

    /* headless browser configs */
    /* crawler and scraper */
    (async () => { 
      await this.setupBrowser();
      console.log('Starting scrape with ', this.spiderInstance.getInitialPage());
      await this.scrape(this.spiderInstance.getInitialPage()); 
    })();
    
  }

  async setupBrowser() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    await this.page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
    );
  }

  async scrape(urlIn) {
    await this.page.goto(urlIn);

    /* gets all urls from the page */
    let crawledUrls = await this.page.$$eval("a", (assetLinks) => assetLinks.map((link) => link.href));
    //console.log(crawledUrls.length, " crawled urls on ", urlIn);
    
    /* sets url to crawl if it's not in the list yet and and matches the regex of interest */
    for (let crawledUrl of crawledUrls) {
      if (
        this.spiderInstance.notInUrlsToAccess(crawledUrl) &&
        new RegExp(this.spiderInstance.getRegexPagesToCrawl()).test(crawledUrl)
      ) {
        this.spiderInstance.setUrlToAccess(crawledUrl);
      }
    }

    /* scrapes if it's a product and it's not in the database yet */
    if (new RegExp(this.spiderInstance.getRegexProducts()).test(urlIn)) {
      try {
        let title = await this.page.evaluate(this.spiderInstance.getTitleSelector());
        let price = await this.page.evaluate(this.spiderInstance.getPriceSelector());
        

        if (title && price) {
          (async () => {
            await InsertProduct({
              url: urlIn,
              title: title,
              price: price,
              store: this.spiderInstance.getStore(),
            });
          })();
          this.prods++;
        }
      } catch (error) {
        console.log("Did not insert. Error: ", error.message);
      }
    }

    console.log(
      this.spiderInstance.getStore() +
      " Checked URLS: " +
        this.spiderInstance.getIndex() +
        "\tProducts: " +
        this.prods +  
        "\tUrls to check: " +
        this.spiderInstance.getUrlsToAccessLength()
    );

    this.spiderInstance.incrementIndex();
console.log("TEATANDO D URL ",this.spiderInstance.getNextUrl())
    /* tests if there are more pages to crawl */
    if (
      this.spiderInstance.getUrlsToAccessLength() >
        this.spiderInstance.getIndex() &&
      this.spiderInstance.getIndex() < this.maxPagesToCrawl
    ) {
      return this.scrape(this.spiderInstance.getNextUrl());
      
    } else {
      await this.browser.close();
    }
  }
}

module.exports = Scraper;
