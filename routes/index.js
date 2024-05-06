const express = require("express");
const router = express.Router();

const userRoutes = require("./user-route");
const orgContributionRoutes = require("./org-contribution");

router.use("/user", userRoutes);
router.use("/org", orgContributionRoutes);
router.use("/get", orgContributionRoutes);

module.exports = router;
