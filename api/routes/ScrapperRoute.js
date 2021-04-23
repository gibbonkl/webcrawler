const { Router } = require("express");
const ScrapperController = require("../controllers/ScrapperController");

const router = Router();

router.get("/pages", ScrapperController.readScrappedPages);

router.get("/pages/:website", ScrapperController.readScrappedPage);

router.post("/pages", ScrapperController.createScrapedUrl);

router.put("/pages/:url", ScrapperController.updateScrapedUrl);

router.delete("/pages/:url", ScrapperController.deleteScrapedUrl);

module.exports = router;
