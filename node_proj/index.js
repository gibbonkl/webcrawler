const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  let inicialPage = "https://ifrs.edu.br/riogrande";
  let maxPageLevel = "7";
  let limitCrawledPages = 2;
  let reg = new RegExp(
    "https://ifrs.edu.br/riogrande" + "(/[^#/]+){0," + maxPageLevel + "}/?$"
  );

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
      // only gets new matching pages
      if (reg.test(crawledUrl) && selectedUrls.indexOf(crawledUrl) < 0)
        selectedUrls.push(crawledUrl);
    }

    // interaction increment
    index++;
  }

  await getUrls(inicialPage);

  try {
    while (selectedUrls.length > index && index < limitCrawledPages) {
      await getUrls(selectedUrls[index]);
    }
  } catch (error) {
    print(error);
  }

  console.log(selectedUrls);
  console.log("Pages crawled: " + index);
  console.log("Pages selected: " + selectedUrls.length);

  browser.close();
})();
