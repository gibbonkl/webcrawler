const puppeteer = require("puppeteer");

(async () => {
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(userAgent);

  let initialPage = "https://www.kabum.com.br";
  let maxPageLevel = "3";
  let limitCrawledPages = 50;
  let reg = new RegExp(
    "https://www.kabum.com.br" + "(/[^#/]+){0," + maxPageLevel + "}/?$"
  );

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
      if (reg.test(crawledUrl) && selectedUrls.indexOf(crawledUrl) < 0)
        selectedUrls.push(crawledUrl);
    }

    let title;
    let price;

    try {
      title = await page.evaluate(
        () => document.querySelector("h1").textContent
      );

      price = await page.evaluate(() => {
        matches = document
          .querySelector("div.preco_traco > span > span > span > strong")
          .textContent.match(/\$ ?(.*),(.*)$/);
        return matches[1] + "." + matches[2];
      });

      category = await page.evaluate(
        () =>
          document
            .querySelector("ol > li:nth-child(1) > a")
            .textContent.match(/(.*) >$/)[1]
      );
    } catch (error) {}

    data && price && category
      ? data.push([category, title, price, urlIn])
      : unwanted.push(urlIn);

    index++;
  }

  await getUrls(initialPage);

  while (selectedUrls.length > index && index < limitCrawledPages) {
    await getUrls(selectedUrls[index]);
  }

  //var myJson = JSON.stringify(data);

  console.log(data);

  console.log(selectedUrls.length);
  console.log(data.length);
  console.log(unwanted.length);

  browser.close();
})();
