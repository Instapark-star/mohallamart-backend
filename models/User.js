const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ["customer", "helper", "gig_worker", "admin"],
    default: "customer"
  },
  address: String,

  // 🆕 Location (for helpers/gig workers)
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },

  // ⭐ Ratings (for helpers/gig workers)
  rating: {
    type: Number,
    default: 0
  },

  // ✅ Timestamp
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
