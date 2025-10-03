const { getAllOrders } = require("../db/orders.db");

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrdersController,
};