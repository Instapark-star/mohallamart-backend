const Shop = require("../models/Shop");

// 🏪 Register a new shop (with optional subscription & location)
const registerShop = async (req, res) => {
  try {
    const { shopName, ownerName, phone, address, latitude, longitude, subscriptionTier } = req.body;

    if (!shopName || !phone) {
      return res.status(400).json({ message: "Shop name and phone are required" });
    }

    const location = {
      type: "Point",
      coordinates: [longitude || 0, latitude || 0]
    };

    const shop = new Shop({
      shopName,
      ownerName,
      phone,
      address,
      location,
      subscriptionTier: subscriptionTier || "standard", // default to standard
      subscriptionValidTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    await shop.save();

    res.status(201).json({
      message: "✅ Shop registered successfully",
      shop
    });
  } catch (err) {
    console.error("❌ Error registering shop:", err.message);
    res.status(500).json({ message: "Server error during shop registration" });
  }
};

// 💼 Upgrade shop subscription tier
const upgradeSubscription = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { newTier, months } = req.body;

    const validTiers = ["standard", "advanced", "big_deal"];
    if (!validTiers.includes(newTier)) {
      return res.status(400).json({ message: "Invalid subscription tier" });
    }

    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    const monthsToAdd = months || 1;
    const currentTill = shop.subscriptionValidTill || new Date();
    const newExpiry = new Date(currentTill.getTime() + monthsToAdd * 30 * 24 * 60 * 60 * 1000);

    shop.subscriptionTier = newTier;
    shop.subscriptionValidTill = newExpiry;
    await shop.save();

    res.status(200).json({ message: "✅ Subscription upgraded", shop });
  } catch (err) {
    console.error("❌ Error upgrading subscription:", err.message);
    res.status(500).json({ message: "Server error during subscription upgrade" });
  }
};

// ✅ Export all controller methods
module.exports = {
  registerShop,
  upgradeSubscription
};
