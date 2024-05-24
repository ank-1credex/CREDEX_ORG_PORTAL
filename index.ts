import express from "express";
import bodyParser from "body-parser";
import { configVariable } from "./config/env.config";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "./interfaces/error.interface";
var cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const index_route = require("./routes/index");
import { CustomError } from "./utility/customError";
import { db } from "./db/db";
const port = parseInt(configVariable.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v1/", index_route);

app.all("*", (req, res, next) => {
  const err = new CustomError(`can not find ${req.url} resource`, 404);
  next(err);
});

app.use(
  (error: errorResponse, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
);

db.sequelize
  .authenticate()
  .then(() => {
    db.sequelize.sync();
    app.listen(port, () => {
      console.log(`Backend server started on port 4000`);
    });
  })
  .catch((error) => {
    console.log("failed to establish connection" + error);
  });
