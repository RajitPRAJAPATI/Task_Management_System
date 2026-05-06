const express = require("express");
const router = express.Router();
const { getProfile, deleteProfile } = require("../controllers/profileControllers");
const { verifyAccessToken } = require("../middlewares.js");

// Routes beginning with /api/profile
router.get("/", verifyAccessToken, getProfile);
router.delete("/delete", verifyAccessToken, deleteProfile);

module.exports = router;