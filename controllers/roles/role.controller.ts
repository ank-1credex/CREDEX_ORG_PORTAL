import { db } from "../../db/db";
import { Request, Response } from "express";
export const createRole = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const isRoleFound = await db.role.findOne({
      where: { role_id: payload.role_id },
    });
    if (isRoleFound) {
      return res.status(400).json({
        data: "Role already exists",
      });
    }
    const saveRole = await db.role.create(payload);
    res.status(200).json({ data: saveRole });
  } catch (err) {
    console.log(err);
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const payload = req.params;
    const role = await db.role.findOne({ where: { role_id: payload.role_id } });
    if (!role) {
      return res.status(400).json({
        data: "No role found",
      });
    }
    res.status(200).json({ data: role });
  } catch (err) {
    console.log(err);
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await db.role.findAll();
    if (!roles) {
      return res.status(400).json({
        data: "No role found",
      });
    }
    res.status(200).json({ data: roles });
  } catch (err) {
    console.log(err);
  }
};
