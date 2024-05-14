import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError";
import { CustomRequest } from "../interfaces/customRequest.interface";

export const authenticate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: any = req.header("Authorization");
    if (!token) {
      throw new CustomError("unauthnticated user", 401);
    }
    token = token.split(" ")[1];
    let result;
    jwt.verify(
      token,
      process.env.PRIVATE_KEY as string,
      (err: any, decoded: any) => {
        if (err) throw new CustomError(err.message, 401);
        result = decoded;
      }
    );
    req.user = result;
    next();
  } catch (error) {
    next(error);
  }
};
