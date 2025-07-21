const express = require("express");
const router = express.Router();
const { registerShop } = require("../controllers/shopController");

router.post("/register", registerShop);

module.exports = router;
