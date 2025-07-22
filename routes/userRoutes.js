const express = require("express");
const router = express.Router();

const {
  registerUser,
  getNearbyDeliveryPeople
} = require("../controllers/userController");

// 👤 Register a user (customer, helper, or gig_worker)
router.post("/register", registerUser);

// 📍 Find nearby delivery people (helper/gig_worker within 2km)
router.post("/nearby", getNearbyDeliveryPeople);

module.exports = router;
