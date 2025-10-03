const express = require("express");
const router = express.Router();

const {
  getAllProductsController,
  getCheapProductsController,
  getElectronicsProductsController,
  getProductsPaginatedController,
  getProductsByUserIdController,
} = require("../controllers/products.controller");

router.get("/products", getAllProductsController);

router.get("/products/cheap", getCheapProductsController);

router.get("/products/electronics", getElectronicsProductsController);

router.get("/products/page/:page", getProductsPaginatedController);

router.get("/users/:id/products", getProductsByUserIdController);

module.exports = router;