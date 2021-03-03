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

  async function getUrls(urlIn) {
    await page.goto(urlIn);

    crawledUrls = await page.$$eval("a", (assetLinks) =>
      assetLinks.map((link) => link.href)
    );

    for (let crawledUrl of crawledUrls) {
      if (reg.test(crawledUrl) && selectedUrls.indexOf(crawledUrl) < 0)
        selectedUrls.push(crawledUrl);
    }

    index++;
  }

  await getUrls(inicialPage);

  while (selectedUrls.length > index && index < limitCrawledPages) {
    await getUrls(selectedUrls[index]);
  }

  console.log("Pages selected: " + selectedUrls.length);

  browser.close();
})();
