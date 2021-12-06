const { Router } = require("express");
const ScrapperController = require("../controllers/ScrapperController");

const validKeys = ["5fe5d072-67e1-46e0-bfbe-53b71cc71712"];

const authMiddleware = (req, res, next) => {
  const key = req.headers.authorization;

  if (key && validKeys.includes(key)) return next();

  return res.status(403).json({ message: "Not authorized" });
};

const router = Router();

/* search products - all products, by name, by store or by price (range, min or max value) */
router.get("/products", ScrapperController.readScrappedProducts);

/* add or update a page - with authentication */
router.post("/products", authMiddleware, ScrapperController.createScrapedUrl);

/* remove a page - with authentication */
router.delete("/products/:url", authMiddleware, ScrapperController.deleteScrapedUrl);

module.exports = router;
