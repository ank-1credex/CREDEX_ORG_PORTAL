import express from "express";
const router = express.Router();

const userRoutes = require("../routes/user-route");
const managerRoute = require("../routes/manager.route");
const employeeRoute = require("../routes/employee.route");

router.use("/user", userRoutes);
router.use("/getManager", managerRoute);
router.use("/getEmployee", employeeRoute);

module.exports = router;
