const Order = require("../models/Order");
const Shop = require("../models/Shop");

// ✅ CREATE ORDER (Direct to Shop)
const createOrder = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { customerName, phone, items, latitude, longitude } = req.body;

    if (!customerName || !phone || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid order format" });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Customer location is required" });
    }

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = new Order({
      shopId,
      customerName,
      customerPhone: phone,
      items,
      customerLocation: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      totalAmount,
      status: "pending"
    });

    await order.save();

    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    let msg = `🛒 *Order Summary* for ${shop.name}\n\n`;
    msg += `👤 *Customer:* ${customerName}\n📞 *Phone:* ${phone}\n\n📦 *Items:*\n`;

    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    msg += `\n💰 *Total:* ₹${totalAmount}`;
    const encodedMsg = encodeURIComponent(msg);
    const whatsappLink = `https://wa.me/${phone}?text=${encodedMsg}`;

    res.status(201).json({
      message: "✅ Order created successfully",
      order,
      whatsappLink
    });
  } catch (err) {
    console.error("❌ Error creating order:", err.message);
    res.status(500).json({ message: "Server error during order creation" });
  }
};

// ✅ BROADCAST ORDER (No specific shop)
const broadcastOrder = async (req, res) => {
  try {
    const { customerName, phone, items, latitude, longitude } = req.body;

    if (!customerName || !phone || !items || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Find nearby subscribed shops within 2km
    const nearbyShops = await Shop.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 2000
        }
      },
      subscriptionTier: { $ne: "standard" }
    });

    if (!nearbyShops.length) {
      return res.status(404).json({ message: "No nearby subscribed shops found" });
    }

    const order = new Order({
      customerName,
      customerPhone: phone,
      items,
      customerLocation: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      totalAmount,
      status: "pending",
      claimedBy: null
    });

    await order.save();

    res.status(201).json({
      message: "✅ Order broadcasted to nearby shops",
      nearbyShops,
      orderId: order._id
    });
  } catch (err) {
    console.error("❌ Error broadcasting order:", err.message);
    res.status(500).json({ message: "Server error during broadcast" });
  }
};

// ✅ CLAIM ORDER (first come, first serve)
const claimOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { shopId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.claimedBy) {
      return res.status(400).json({ message: "❌ Order already claimed by another shop" });
    }

    order.claimedBy = shopId;
    order.status = "claimed";
    await order.save();

    res.json({ message: "✅ Order claimed successfully", order });
  } catch (err) {
    console.error("❌ Error claiming order:", err.message);
    res.status(500).json({ message: "Server error during order claim" });
  }
};

// ✅ GET all orders for a shop
const getOrdersByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const orders = await Order.find({ shopId }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "✅ Orders fetched",
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// ✅ GET a single order
const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "❌ Order not found" });
    }
    res.status(200).json({
      message: "✅ Order fetched successfully",
      order,
    });
  } catch (err) {
    console.error("❌ Error fetching order:", err.message);
    res.status(500).json({ message: "Server error while fetching order" });
  }
};

// ✅ GET by ID (with shop populated)
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("shopId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching order", error: error.message });
  }
};

// ✅ DELETE an order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted) {
      return res.status(404).json({ message: "❌ Order not found" });
    }
    res.status(200).json({ message: "🗑️ Order deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting order:", err.message);
    res.status(500).json({ message: "Server error while deleting order" });
  }
};

// ✅ FIND NEARBY SHOPS (2km)
const getNearbyShops = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and Longitude are required" });
    }

    const shops = await Shop.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 2000
        }
      }
    });

    res.json({ shops });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error finding nearby shops" });
  }
};

// ✅ ASSIGN delivery to helper or gig worker
const assignDeliveryPerson = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryMode, deliveryBy, tipAmount = 0, paidOnline = false } = req.body;

    if (!["helper", "gig_worker"].includes(deliveryMode)) {
      return res.status(400).json({ message: "Invalid delivery mode" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.deliveryBy) {
      return res.status(400).json({ message: "Delivery already assigned" });
    }

    order.deliveryMode = deliveryMode;
    order.deliveryBy = deliveryBy;
    order.tipAmount = deliveryMode === "helper" ? tipAmount : 0;
    order.paidOnline = deliveryMode === "helper" ? true : paidOnline;
    order.status = "out_for_delivery";

    await order.save();
    res.status(200).json({ message: "✅ Delivery person assigned", order });
  } catch (err) {
    console.error("❌ Error assigning delivery:", err.message);
    res.status(500).json({ message: "Server error during delivery assignment" });
  }
};

// ✅ Mark Order as Delivered
const markOrderDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "out_for_delivery") {
      return res.status(400).json({ message: "Order is not out for delivery" });
    }

    order.status = "delivered";
    order.deliveredAt = new Date();

    await order.save();
    res.status(200).json({ message: "✅ Order marked as delivered", order });
  } catch (err) {
    console.error("❌ Error marking order delivered:", err.message);
    res.status(500).json({ message: "Server error during delivery update" });
  }
};

// ✅ Export everything
module.exports = {
  createOrder,
  broadcastOrder,
  claimOrder,
  getOrdersByShop,
  getSingleOrder,
  deleteOrder,
  getOrderById,
  getNearbyShops,
  assignDeliveryPerson,
  markOrderDelivered
};
