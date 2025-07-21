const Shop = require("../models/Shop");

const registerShop = async (req, res) => {
  try {
    const { storeName, ownerName, phone, address, location } = req.body;

    const shopExists = await Shop.findOne({ phone });
    if (shopExists) {
      return res.status(400).json({ message: "Shop already registered with this phone number" });
    }

    const newShop = new Shop({
      storeName,
      ownerName,
      phone,
      address,
      location
    });

    await newShop.save();

    res.status(201).json({ message: "Shop registered successfully", shop: newShop });
  } catch (error) {
    console.error("Error registering shop:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerShop
};
