const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true
  },
  ownerName: String,
  phone: String,
  address: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  image: String,

  // 💼 Subscription Tiers
  subscriptionTier: {
    type: String,
    enum: ["standard", "advanced", "big_deal"],
    default: "standard"
  },
  subscriptionValidTill: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from registration
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

shopSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Shop", shopSchema);
