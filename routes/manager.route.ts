const express = require("express");
const router = express.Router();

import {
  allMemeberOfManager,
  allContributionByEmployee,
  updateTheOrgData,
  uploadingProject,
  getAllProjectList,
  deleteProject,
} from "../controllers/managers/managers.controller";

import { authenticate } from "../utility/authenticate";
import { roleBased } from "../utility/roleBasedAccess";

router.post(
  "/allMemberOfManager",
  authenticate,
  // roleBased("manager"),
  allMemeberOfManager
);
router.post(
  "/allContributionByEmployee",
  // authenticate,
  // roleBased("manager"),
  allContributionByEmployee
);
router.post(
  "/updateTheOrgData",
  // authenticate,
  // roleBased("manager"),
  updateTheOrgData
);
router.post(
  "/uploadingProject",
  // authenticate,
  // roleBased("manager"),
  uploadingProject
);

router.get(
  "/getAllProjectList",
  // authenticate,
  // roleBased("manager"),
  getAllProjectList
);

router.delete(
  "/deleteProjects",
  authenticate,
  // roleBased("manager"),
  deleteProject
);
module.exports = router;
