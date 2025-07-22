const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ""
  },

  // 🆕 Category Flags
  isMedicine: {
    type: Boolean,
    default: false
  },
  isAlcohol: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
