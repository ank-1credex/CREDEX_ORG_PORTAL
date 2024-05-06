const express = require("express");
const router = express.Router();

const orgContributionController = require("../controllers/org_contribution/org-contribution.controller");
const auth = require("../utility/authenticate");

router.post("/add", orgContributionController.addHoursInOrgContribution);
router.get(
  "/get-org-contribution/:id",
  orgContributionController.getOrgHoursByUserId
);
router.get("/projects", orgContributionController.getProjects);

module.exports = router;
