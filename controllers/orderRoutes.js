// routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");

router.post("/shop/:shopId/order", createOrder);

module.exports = router;
