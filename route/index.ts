import express from "express";
const router = express.Router();

const userRoutes = require("../route/user-route");
const managerRoute = require("../route/manager.route");
const employeeRoute = require("../route/employee.route");

router.use("/user", userRoutes);
router.use("/getManager", managerRoute);
router.use("/getEmployee", employeeRoute);

module.exports = router;
