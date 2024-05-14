import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError";
import { CustomRequest } from "../interfaces/customRequest.interface";

export const roleBased =
  (roles: any) => (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (roles !== req.user.role)
        throw new CustomError("Not authorized !!!", 403);
      next();
    } catch (error) {
      next(error);
    }
  };
