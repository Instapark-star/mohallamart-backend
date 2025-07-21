const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

const {
  addProduct,
  getInventory,
  updateProduct,
  deleteProduct
} = require("../controllers/inventoryController");

// Add product (with image upload)
router.post("/:shopId/inventory", upload.single("image"), addProduct);

// Get all products
router.get("/:shopId/inventory", getInventory);

// Edit product
router.put("/product/:productId", upload.single("image"), updateProduct);

// Delete product
router.delete("/product/:productId", deleteProduct);

module.exports = router;
