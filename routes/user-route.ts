import express from "express";
const router = express.Router();

import {
  login,
  signup,
  getUsers,
  getUserById,
  getUsersByManagerId,
} from "../controllers/users/user-controller";

router.post("/login", login);
router.post("/signup", signup);
router.get("/users", getUsers);
router.get("/user-by-id/:id", getUserById);
router.get("/users-by-manager", getUsersByManagerId);

module.exports = router;
