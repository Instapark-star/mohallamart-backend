// app.js

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Import route files
const shopRoutes = require("./routes/shopRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for product images)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("👋 Welcome to MohallaMart backend");
});

// API Routes
app.use("/api/shop", shopRoutes);        // /api/shop/register, /upgrade-subscription
app.use("/api", inventoryRoutes);        // /api/:shopId/inventory
app.use("/api", orderRoutes);            // /api/shop/:shopId/order, /broadcast, /order/:id
app.use("/api/user", userRoutes);        // /api/user/register, /api/user/nearby

module.exports = app;
