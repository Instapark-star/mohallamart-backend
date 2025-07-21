// app.js

const express = require("express");
const cors = require("cors");

const app = express();

// Import route files
const shopRoutes = require("./routes/shopRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ✅ Added

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("👋 Welcome to MohallaMart backend");
});

// Route handlers
app.use("/api/shop", shopRoutes);        // POST /api/shop/register
app.use("/api", inventoryRoutes);        // /api/:shopId/inventory
app.use("/api", orderRoutes);            // POST /api/shop/:shopId/order

module.exports = app;
