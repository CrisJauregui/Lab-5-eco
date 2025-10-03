const express = require("express");
const router = express.Router();

const { getAllOrdersController } = require("../controllers/orders.controller");

router.get("/orders", getAllOrdersController);

module.exports = router;