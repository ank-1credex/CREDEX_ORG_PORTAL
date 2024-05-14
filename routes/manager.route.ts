const express = require("express");
const router = express.Router();

import {
  allMemeberOfManager,
  allContributionByEmployee,
  updateTheOrgData,
  uploadingProject,
} from "../controllers/managers/managers.controller";

import { authenticate } from "../utility/authenticate";
import { roleBased } from "../utility/roleBasedAccess";

router.get(
  "/allMemberOfManager",
  authenticate,
  roleBased("manager"),
  allMemeberOfManager
);
router.get(
  "/allContributionByEmployee",
  authenticate,
  roleBased("manager"),
  allContributionByEmployee
);
router.put(
  "/updateTheOrgData",
  authenticate,
  roleBased("manager"),
  updateTheOrgData
);
router.post(
  "/uploadingProject",
  authenticate,
  roleBased("manager"),
  uploadingProject
);

module.exports = router;
