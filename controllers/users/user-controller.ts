import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { db } from "../../db/db";
import { configVariable } from "../../config/env.config";
import { CustomError } from "../../utility/customError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const isUserExist = await db.user.findOne({
      where: { email: payload.email },
    });
    if (!isUserExist) {
      throw new CustomError("user does not exist", 404);
    }
    const hashedPassword = await bcrypt.compare(
      payload.password,
      isUserExist.password
    );
    if (!hashedPassword) throw new CustomError("wrong password", 401);

    const roles = await db.role.findOne({ where: { id: isUserExist.RoleId } });
    const token = {
      email: isUserExist.dataValues.email,
      id: isUserExist.id,
      role: roles.dataValues.role,
      date: Date.now(),
    };
    const accessToken = Jwt.sign(token, configVariable.secret_key, {
      expiresIn: "50m",
    });
    const data = {
      accessToken,
      name: `${isUserExist.dataValues.first_name} ${isUserExist.dataValues.last_name}`,
      email: payload.email,
      id: isUserExist.id,
      data: Date.now(),
    };
    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const checkEmailAlreadyExist = await db.user.findOne({
      where: { email: payload.email },
    });
    if (checkEmailAlreadyExist) {
      throw new CustomError("user alreday Registered !, please login", 409);
    }
    let roles = await db.role.findOne({
      where: { role: payload.role_name },
    });
    if (!roles) {
      roles = await db.role.create({ role: payload.role_name });
    }
    let manager = await db.manager.findOne({
      where: { manager_name: payload.manager_name },
    });

    if (!manager) {
      manager = await db.manager.create({
        manager_name: payload.manager_name,
      });
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);

    const obj = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone_number: payload.phone_number,
      email: payload.email,
      password: passwordHash,
      gender: payload.gender,
      RoleId: roles.id,
      ManagerId: manager.id,
      employee_id: payload.employee_id,
    };
    const data = await db.user.create(obj);
    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findAll();
    if (!users) {
      res.status(200).send("No user found");
    }
    res.status(200).json({
      data: users,
    });
  } catch (err) {
    throw err;
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await db.user.findOne({ where: { user_id: userId } });
    if (!user) {
      res.status(200).send("No user found");
    }
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    throw err;
  }
};

export const getUsersByManagerId = async (req: Request, res: Response) => {
  try {
    const payload = req.query;
    const users = await db.user.findAll({
      where: { manager_id: payload.id, role_id: 2 },
    });
    if (!users) {
      res.status(200).send("No user found");
    }
    res.status(200).json({
      data: users,
    });
  } catch (err) {
    throw err;
  }
};

export const getManagers = async (req: Request, res: Response) => {
  try {
    const managersList = await db.manager.findAll();
    if (!managersList) {
      throw "No Manager Found";
    }
    res.status(200).json({
      data: managersList,
    });
  } catch (err) {
    throw err;
  }
};
