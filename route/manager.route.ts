const express = require("express");
const router = express.Router();

import {
  allMemeberOfManager,
  allContributionByEmployee,
  updateTheOrgData,
  uploadingProject,
  getAllProjectList,
  deleteProject,
  clients,
  updateProjectname,
} from "../controllers/manager/managers.controller";

import { authenticate } from "../utility/authenticate";
import { roleBased } from "../utility/roleBasedAccess";

router.get(
  "/allMemberOfManager",
  authenticate,
  roleBased("manager"),
  allMemeberOfManager
);
router.post(
  "/allContributionByEmployee",
  authenticate,
  roleBased("manager"),
  allContributionByEmployee
);
router.post(
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

router.get(
  "/getAllProjectList",
  authenticate,
  roleBased("manager"),
  getAllProjectList
);

router.delete(
  "/deleteProjects",
  authenticate,
  roleBased("manager"),
  deleteProject
);

router.get(
  "/clients",
  authenticate,
  roleBased("manager"),
  clients
);

router.put(
  "/updateProjectname",
  authenticate,
  roleBased("manager"),
  updateProjectname
);
module.exports = router;
