const express = require("express");
const {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getApplications);
router.post("/", protect, createApplication);
router.get("/:id", protect, getApplicationById);
router.put("/:id", protect, updateApplication);
router.delete("/:id", protect, deleteApplication);

module.exports = router;