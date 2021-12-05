const database = require("../models");
const { Op } = require("sequelize");
class ScrapperController {
  static async createScrapedUrl(req, res) {
    console.log("Adding/updating new page... ", req.body);
    const newScrapedUrl = req.body;
    try {
      const newScrapedUrlCreated = await database.ScrappingPages.upsert(
        newScrapedUrl
      );
      return res.status(200).json(newScrapedUrlCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateScrapedUrl(req, res) {
    const { url } = req.params;
    const updateScrapedUrl = req.body;
    try {
      await database.ScrappingPages.update(updateScrapedUrl, {
        where: { url: String(url) },
      });
      const updatedUrl = await database.ScrappingPages.findOne({
        where: { url: String(url) },
      });
      return res.status(200).json(updatedUrl);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteScrapedUrl(req, res) {
    const { url } = req.params;
    try {
      await database.ScrappingPages.destroy({
        where: { url: String(url) },
      });
      return res.status(200).json(`url: ${url} deleted`);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async readScrappedProducts(req, res) {
    console.log("Query params: ", req.query);
    const { store, title, minPrice, maxPrice } = req.query;

    const where = {};
    if (store) {
      where.store = {
        [Op.like]: `%${store}%`,
      };
    }
    if (title) {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }

    if (minPrice && maxPrice) {
      where.price = {
        [Op.between]: [Number(minPrice), Number(maxPrice)],
      };
    } else if (minPrice) {
      where.price = {
        [Op.gte]: Number(minPrice),
      };
    } else if (maxPrice) {
      where.price = {
        [Op.lte]: Number(maxPrice),
      };
    }

    console.log("WHERE: \n", where);

    try {
      const pagesContent = await database.ScrappingPages.findAll({
        where: where,
      });
      return res
        .status(200)
        .json({ total: pagesContent.length, content: pagesContent });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  /*
  static async readScrappedPage(req, res) {
    const { website } = req.params;
    try {
      const pageContent = await database.ScrappingPages.findAll({
        where: { website: String(website) },
      });
      return res.status(200).json(pageContent);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  */
}

module.exports = ScrapperController;
