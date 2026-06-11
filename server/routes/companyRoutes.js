const express = require("express");
const { getCompanyHistory } = require("../controllers/companyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:companyName/history", protect, getCompanyHistory);

module.exports = router;