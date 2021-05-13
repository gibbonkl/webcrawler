const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
  );

  let initialPage =
    "https://www.pichau.com.br/hardware/placa-m-e/placa-mae-gigabyte-ga-a320m-s2h-ddr4-socket-am4-chipset-amd-a320";
  //let maxPageLevel = "3";
  let limitCrawledPages = 5;
  let reg = new RegExp("https://www.pichau.com.br/.*");

  let selectedUrls = [];
  let crawledUrls = [];
  let index = -1;
  let data = [];
  let unwanted = [];

  async function getUrls(urlIn) {
    await page.goto(urlIn);

    crawledUrls = await page.$$eval("a", (assetLinks) =>
      assetLinks.map((link) => link.href)
    );

    for (let crawledUrl of crawledUrls) {
      if (reg.test(crawledUrl) && selectedUrls.indexOf(crawledUrl) == -1)
        selectedUrls.push(crawledUrl);
    }

    try {
      let title = await page.evaluate(
        () => document.querySelector("h1").textContent
      );

      let price = await page.evaluate(
        () =>
          document
            .querySelector(".price-boleto")
            .textContent.match(/([0-9]+),([0-9]+)/)[0]
      );

      title && price ? data.push([title, price, urlIn]) : unwanted.push(urlIn);
    } catch (error) {}

    index++;
  }

  await getUrls(initialPage);

  while (selectedUrls.length > index && index < limitCrawledPages) {
    await getUrls(selectedUrls[index]);
  }

  console.log(data);

  browser.close();
})();
