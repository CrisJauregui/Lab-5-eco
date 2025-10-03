const {
    getAllProducts,
    getCheapProducts,
    getElectronicsProducts,
    getProductsPaginated,
    getProductsByUserId,
  } = require("../db/products.db");

  const getAllProductsController = async (req, res) => {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getCheapProductsController = async (req, res) => {
    try {
      const products = await getCheapProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getElectronicsProductsController = async (req, res) => {
    try {
      const products = await getElectronicsProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getProductsPaginatedController = async (req, res) => {
    try {
      const { page } = req.params;
      const pageNumber = parseInt(page);
  
      if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({ error: "Número de página inválido" });
      }
  
      const products = await getProductsPaginated(pageNumber);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getProductsByUserIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = parseInt(id);
  
      if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }
  
      const products = await getProductsByUserId(userId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllProductsController,
    getCheapProductsController,
    getElectronicsProductsController,
    getProductsPaginatedController,
    getProductsByUserIdController,
  };