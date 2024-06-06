import { NextFunction, Request, Response } from "express";
const { Op } = require("sequelize");
import { CustomError } from "../../utility/customError";
import { db } from "../../db/db";
import { CustomRequest } from "../../interface/customRequest.interface";

export const updateTheOrgData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const orgData = await db.orgcontribution.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!orgData) return res.status(204).json({ message: "not found" });
    orgData.status = payload.status;
    const data = await orgData.save();
    const user = await db.user.findOne({ where: { first_name: payload.name } });
    if (!user) return res.status(204).json({ message: "not found" });
    const allContributions = await db.orgcontribution.findAll({
      where: {
        user_id: {
          [Op.eq]: user.id,
        },
        status: {
          [Op.ne]: "Draft",
        },
      },
    });
    return res.status(200).json({ data: allContributions });
  } catch (error) {
    next(error);
  }
};

export const allMemeberOfManager = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const manager = await db.manager.findOne({
      where: { manager_name: req.user.name },
    });
    const allTheEmployee = await db.user.findAll({
      where: { ManagerId: manager.id },
    });
    res.status(200).json({ data: allTheEmployee });
  } catch (error) {
    next(error);
  }
};

export const allContributionByEmployee = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const user = await db.user.findOne({ where: { first_name: payload.name } });
    if (!user) return res.status(204).json({ message: "not found" });
    const allContributions = await db.orgcontribution.findAll({
      where: {
        user_id: {
          [Op.eq]: user.id,
        },
        status: {
          [Op.ne]: "Draft",
        },
      },
    });
    if (allContributions.length === 0) {
      return res.status(404).json({ message: "not found" });
    }
    return res.status(200).json({ contributiions: allContributions });
  } catch (error) {
    next(error);
  }
};

export const uploadingProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const { projectName, clientName, address, isBillable } = payload;
    let client = await db.client.findOne({
      where: { client_name: clientName },
    });
    if (!client)
      client = await db.client.create({
        client_name: clientName,
        address: address,
      });
    let project = await db.projects.findOne({
      where: { project_name: projectName },
    });
    if (project) throw new CustomError("project already exists", 409);
    project = await db.projects.create({
      client_id: client.id,
      project_name: projectName,
      is_billable: isBillable,
    });
    return res.status(201).json({ projects: project });
  } catch (error) {
    next(error);
  }
};

export const getAllProjectList = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProjects = await db.projects.findAll();
    if (!allProjects) return res.status(204).json({ message: "not found" });
    return res.status(200).json({ data: allProjects });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const result = await db.projects.destroy({ where: { id: payload.id } });
    if (!result) throw new CustomError("failed to delete", 400);
    return res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const clients = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await db.client.findAll();
    const clientName = clients.map(
      (client: { client_name: String }) => client.client_name
    );
    return res.status(200).json({ data: clientName });
  } catch (error) {
    next(error);
  }
};

export const updateProjectname = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const project = await db.projects.findOne({
      where: { id: payload.id },
    });
    await project.update({ ...payload });
    return res.status(200).json({ data: "succesfully updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
