const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdersByShop,
  getSingleOrder,
  deleteOrder,
  getOrderById,
  getNearbyShops,
  claimOrder,
  assignDeliveryPerson
} = require("../controllers/orderController");

// 🛒 Order creation
router.post("/shop/:shopId/order", createOrder);

// 📦 Get all orders by shop
router.get("/shop/:shopId/orders", getOrdersByShop);

// 📄 Get single order
router.get("/order/:orderId", getSingleOrder);

// 🗑️ Delete order
router.delete("/order/:orderId", deleteOrder);

// 🔍 Get detailed order with shop populated (optional)
router.get("/order-details/:orderId", getOrderById);

// 📍 Find nearby shops (within 2km)
router.post("/nearby-shops", getNearbyShops);

// ✋ Claim order by shop
router.post("/order/:orderId/claim", claimOrder);

// 🚚 Assign helper or gig worker for delivery
router.post("/order/:orderId/assign-delivery", assignDeliveryPerson);

module.exports = router;
