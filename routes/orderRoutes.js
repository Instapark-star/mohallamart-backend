const express = require("express");
const router = express.Router();

const {
  createOrder,
  broadcastOrder,
  getOrdersByShop,
  getSingleOrder,
  getOrderById,
  deleteOrder,
  claimOrder,
  assignDeliveryPerson,
  markOrderDelivered,
  getNearbyShops
} = require("../controllers/orderController");

// 🛒 Create order directly for a specific shop
router.post("/shop/:shopId/order", createOrder);

// 📡 Broadcast order to nearby subscribed shops
router.post("/broadcast", broadcastOrder);

// 📦 Get all orders for a specific shop
router.get("/shop/:shopId/orders", getOrdersByShop);

// 🔍 Get a basic order by ID
router.get("/order/:orderId", getSingleOrder);

// 🔍 Get order with shop populated
router.get("/order-details/:orderId", getOrderById);

// 🗑️ Delete an order
router.delete("/order/:orderId", deleteOrder);

// 🏃 Claim a broadcast order (first come first serve)
router.post("/order/:orderId/claim", claimOrder);

// 👷 Assign delivery person (helper or gig_worker)
router.post("/order/:orderId/assign", assignDeliveryPerson);

// ✅ Mark order as delivered
router.post("/order/:orderId/mark-delivered", markOrderDelivered);

// 📍 Find nearby shops (within 2km)
router.post("/nearby-shops", getNearbyShops);

module.exports = router;
