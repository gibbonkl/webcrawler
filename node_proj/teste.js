const puppeteer = require("puppeteer");

(async () => {
  // Pass the User-Agent Test.
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent(userAgent);

  let initialPage =
    "https://www.pichau.com.br/hardware/placa-m-e/placa-mae-asus-tuf-h310m-plus-gaming-br-ddr4-socket-lga1151-chipset-intel-h310";
  let maxPageLevel = "3";
  let limitCrawledPages = 0;
  let reg = new RegExp(
    "https://www.pichau.com.br" + "(/[^#/]+){" + maxPageLevel + "}/?$"
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

    const textContent = await page.evaluate(() => {
      return document.body.innerHTML;
    });
    console.log(textContent);
    index++;
  }

  await getUrls(initialPage);

  while (selectedUrls.length > index && index < limitCrawledPages) {
    await getUrls(selectedUrls[index]);
  }

  console.log(selectedUrls.length);
  console.log(index);

  browser.close();
})();
