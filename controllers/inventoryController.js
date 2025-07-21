const Product = require("../models/Product");

// Add new product to shop inventory (with image upload support)
const addProduct = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { name, price, quantity } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      shop: shopId,
      name,
      price,
      quantity,
      imageUrl
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// Get all products of a shop
const getInventory = async (req, res) => {
  try {
    const { shopId } = req.params;

    const products = await Product.find({ shop: shopId });
    res.json(products);
  } catch (error) {
    console.error("Error getting inventory:", error);
    res.status(500).json({ message: "Failed to get inventory" });
  }
};

// Edit/update a product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, quantity } = req.body;

    const updateData = {
      name,
      price,
      quantity
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", product: deleted });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = {
  addProduct,
  getInventory,
  updateProduct,
  deleteProduct
};
