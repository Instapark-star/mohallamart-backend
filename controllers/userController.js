const User = require("../models/User");

// ✅ Register helper, gig_worker, or customer
exports.registerUser = async (req, res) => {
  try {
    const { name, phone, role, address, latitude, longitude } = req.body;

    if (!name || !phone || !role) {
      return res.status(400).json({ message: "Name, phone, and role are required" });
    }

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "❌ User already exists", user: existing });
    }

    const location = {
      type: "Point",
      coordinates: (longitude && latitude) ? [longitude, latitude] : [0, 0]
    };

    const user = new User({
      name,
      phone,
      role,
      address,
      location
    });

    await user.save();

    res.status(201).json({ message: "✅ User registered successfully", user });
  } catch (err) {
    console.error("❌ Error registering user:", err.message);
    res.status(500).json({ message: "Server error during user registration" });
  }
};

// ✅ Find nearby helpers or gig workers
exports.getNearbyDeliveryPeople = async (req, res) => {
  try {
    const { latitude, longitude, role } = req.body;

    if (!latitude || !longitude || !role) {
      return res.status(400).json({ message: "Latitude, longitude, and role are required" });
    }

    if (!["helper", "gig_worker"].includes(role)) {
      return res.status(400).json({ message: "❌ Invalid role: must be 'helper' or 'gig_worker'" });
    }

    const users = await User.find({
      role,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 2000 // 2km
        }
      }
    });

    res.status(200).json({ message: "✅ Nearby delivery people fetched", count: users.length, users });
  } catch (err) {
    console.error("❌ Error finding delivery people:", err.message);
    res.status(500).json({ message: "Server error while searching for helpers/gig workers" });
  }
};
