const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

const {
  addProduct,
  getInventory,
  updateProduct,
  deleteProduct
} = require("../controllers/inventoryController");

// ➕ Add new product to a shop's inventory (with optional image)
router.post("/:shopId/inventory", upload.single("image"), addProduct);

// 📦 Get all products for a shop
router.get("/:shopId/inventory", getInventory);

// ✏️ Update a product (optionally update image too)
router.put("/product/:productId", upload.single("image"), updateProduct);

// 🗑️ Delete a product
router.delete("/product/:productId", deleteProduct);

module.exports = router;
