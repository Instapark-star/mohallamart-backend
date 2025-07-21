const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdersByShop,
  deleteOrder,
  updateOrderStatus,
  getOrderById
} = require("../controllers/orderController");

// ✅ Create a new order
router.post("/shop/:shopId/order", createOrder);

// ✅ Get all orders of a shop
router.get("/shop/:shopId/orders", getOrdersByShop);

// ✅ Get a single order by ID
router.get("/order/:orderId", getOrderById);

// ✅ Delete an order
router.delete("/order/:orderId", deleteOrder);

// ✅ Update order status (Pending, Completed, Cancelled)
router.put("/order/:orderId/status", updateOrderStatus);

module.exports = router;
