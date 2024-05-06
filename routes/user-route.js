const express = require("express");
const router = express.Router();

const userController = require("../controllers/users/user-controller");
const auth = require("../utility/authenticate");

router.post("/login", userController.login);
router.post("/signup", userController.signUp);
router.get("/users", userController.getUsers);
router.get("/user-by-id/:id", userController.getUserById);
router.get("/users-by-manager", userController.getUsersByManagerId);

module.exports = router;

