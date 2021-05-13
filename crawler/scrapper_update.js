const puppeteer = require("puppeteer");
const models = require("../api/models");

module.exports = async (Spider) => {
  console.log(Spider.getWebsite());
  let json;
  try {
    json = await models.ScrappingPages.findAll({
      where: { website: String(Spider.getWebsite()) },
      raw: true,
    });
  } catch (error) {
    console.log(error.message);
  }

  var array = json.map((i) => i.url);

  console.log(array);
};
