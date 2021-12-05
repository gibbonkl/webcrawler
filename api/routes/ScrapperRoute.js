const { Router } = require("express");
const ScrapperController = require("../controllers/ScrapperController");

const validKeys = ["5fe5d072-67e1-46e0-bfbe-53b71cc71712"];

const authMiddleware = (req, res, next) => {
  const key = req.headers.authorization;

  if (key && validKeys.includes(key)) return next();

  return res.status(403).json({ message: "Not authorized" });
};

const router = Router();

/*
 * TODOS PRODUTOS
 * TODOS PRODUTOS POR LOJA
 * BUSCAR PRODUTOS PELO NOME E PREÇO
 */
router.get("/products", ScrapperController.readScrappedProducts);

/*
 * ADICIONAR UMA NOVA PAGINA
 * AUTH
 */
router.post("/products", authMiddleware, ScrapperController.createScrapedUrl);

/*
 * ATUALIZAR UMA PAGINA
 * AUTH
 */
router.put("/products/:url", authMiddleware, ScrapperController.updateScrapedUrl);

/*
 * REMOVER PAGINA
 * AUTH
 */
router.delete("/products/:url", authMiddleware, ScrapperController.deleteScrapedUrl);

module.exports = router;
