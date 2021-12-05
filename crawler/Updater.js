const puppeteer = require("puppeteer");
const models = require("../api/models");
const { Op } = require("sequelize");

module.exports = async (Spider) => {
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

  const browser = await puppeteer.launch(
    {
    headless: true
    ,args: ['--no-sandbox']
    }
  );
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
  );

  async function updateUrl(obj, urlIn) {
    await page.goto(urlIn);

    try {
      let price = await page.evaluate(obj.getPriceSelector());

      if (price) {
        obj.setData([urlIn, price]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  try {
    for (url of mappedUrls)
      await updateUrl(Spider,url);
  } catch (error) {    
    console.log(error.message);
  }

  try {
    for (element of Spider.getData()) {
      await models.ScrappingPages.update(
        {
          price: `${element[1]}`,
        },
        {
          where: {
            [Op.and]: [
              { url: `${element[0]}` },
              { price: { [Op.not]: `${element[1]}` } },
            ],
          },
        }
      );
    };
  } catch (error) {
    return res.status(500).json(error.message);
  }

  browser.close();
};
