const express = require("express");
const router = express.Router();
const {
  registerShop,
  upgradeSubscription,
} = require("../controllers/shopController");

// 🏪 Register a new shop (with optional subscription & geolocation)
router.post("/register", registerShop);

// 💼 Upgrade subscription tier for a shop
router.put("/:shopId/upgrade-subscription", upgradeSubscription);

module.exports = router;
