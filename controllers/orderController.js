// controllers/orderController.js

const Order = require("../models/Order");
const Shop = require("../models/Shop");

exports.createOrder = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { customerName, phone, items } = req.body;

    if (!customerName || !phone || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid order format" });
    }

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = new Order({
      shopId,
      customerName,
      phone,
      items,
      totalAmount,
    });

    await order.save();

    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    let msg = `🛒 *Order Summary* for ${shop.shopName}\n\n`;
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
      whatsappLink,
    });
  } catch (err) {
    console.error("❌ Error creating order:", err.message);
    res.status(500).json({ message: "Server error during order creation" });
  }
};
// GET all orders for a shop
exports.getOrdersByShop = async (req, res) => {
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
// GET a single order by ID
exports.getSingleOrder = async (req, res) => {
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
// DELETE order by ID
exports.deleteOrder = async (req, res) => {
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
// ✅ View Single Order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("shop");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching order", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrdersByShop,
  deleteOrder,
  updateOrderStatus,
  getOrderById, // ⬅️ Don't forget to add this here
};
