const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop"
  },
  customerName: String,
  customerPhone: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      status: {
        type: String,
        default: "pending"
      }
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "claimed", "ready", "out_for_delivery", "delivered", "cancelled"],
    default: "pending"
  },
  customerLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    default: null
  },
  deliveryMode: {
    type: String,
    enum: ["helper", "gig_worker", null],
    default: null
  },
  deliveryBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // future delivery partner/helper user
    default: null
  },
  tipAmount: {
    type: Number,
    default: 0
  },
  paidOnline: {
    type: Boolean,
    default: false
  },
  deliveredAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

orderSchema.index({ customerLocation: "2dsphere" });

module.exports = mongoose.model("Order", orderSchema);
