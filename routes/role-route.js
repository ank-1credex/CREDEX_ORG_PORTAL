const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roles/role.controller");
const auth = require("../utility/authenticate");

router.post("/create-role", roleController.createRole);
router.get("/roles", auth, roleController.getRoles);
router.get("/get-role-by-id/:id", auth, roleController.getRoleById);

module.exports = router;
