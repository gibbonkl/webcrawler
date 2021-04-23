const database = require("../models");
//CRUD

class ScrapperController {
  static async createScrapedUrl(req, res) {
    const newScrapedUrl = req.body;
    try {
      const newScrapedUrlCreated = await database.ScrappingPages.create(
        newScrapedUrl
      );
      return res.status(200).json(newScrapedUrlCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async readScrappedPages(req, res) {
    try {
      //looking for the return in the model so it can resolve the queries
      const pagesContent = await database.ScrappingPages.findAll();
      return res.status(200).json(pagesContent);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

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
}

module.exports = ScrapperController;
