const express = require("express");
const router = express.Router();

import {
  getAllProjects,
  getTheOrgData,
  addHoursInOrgContribution,
  AllcontributionOfEmployee,
  updateEmployeeContributionData,
  deleteEmployeeContributionData,
} from "../controllers/employee/employee.controller";
import { authenticate } from "../utility/authenticate";
import { roleBased } from "../utility/roleBasedAccess";

router.get(
  "/getAllProjects",
  authenticate,
  roleBased("employee"),
  getAllProjects
);

router.post(
  "/addHoursInOrgContribution",
  authenticate,
  roleBased("employee"),
  addHoursInOrgContribution
);
router.get(
  "/getTheOrgData",
  authenticate,
  roleBased("employee"),
  getTheOrgData
);

router.get(
  "/AllcontributionOfEmployee",
  authenticate,
  roleBased("employee"),
  AllcontributionOfEmployee
);

router.put(
  "/updateEmployeeContributionData",
  authenticate,
  roleBased("employee"),
  updateEmployeeContributionData
);

router.delete(
  "/deleteEmployeeContributionData",
  authenticate,
  roleBased("employee"),
  deleteEmployeeContributionData
);

module.exports = router;
