import express from "express";
const router = express.Router();

import {
  login,
  signup,
  getManagers,
} from "../controllers/auth/user-controller";

router.post("/login", login);
router.post("/signup", signup);
router.get("/getManagers", getManagers);

module.exports = router;
