const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
  location: {
    lat: Number,
    lng: Number,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Shop", shopSchema);
