const express = require("express");
const router = express.Router();

import {
  getAllProjects,
  getTheOrgData,
  addHoursInOrgContribution,
} from "../controllers/employee/employee.controller";
import { authenticate } from "../utility/authenticate";
import { roleBased } from "../utility/roleBasedAccess";

router.get(
  "/getAllProjects",
  authenticate,
  // roleBased("employee"),
  getAllProjects
);

router.post(
  "/addHoursInOrgContribution",
  authenticate,
  addHoursInOrgContribution
);
router.get(
  "/getTheOrgData",
  authenticate,
  // roleBased("employee"),
  getTheOrgData
);

module.exports = router;
