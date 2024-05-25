import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../interfaces/customRequest.interface";
import { CustomError } from "../../utility/customError";
import { db } from "../../db/db";

export const addHoursInOrgContribution = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const project = await db.projects.findOne({
      where: {
        project_name: payload.projectName,
      },
    });
    if (!project) throw new CustomError("no project found !!", 404);
    const data = {
      project_id: project.id,
      user_id: req.user.id,
      hours: payload.Hours,
      message: payload.Message,
      quarter: payload.Quarter,
      status: "pending",
    };
    const saveOrghours = await db.orgcontribution.create(data);
    res.status(200).json({ data: saveOrghours });
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProjects = await db.projects.findAll();
    if (!allProjects) throw new CustomError("no project found !!", 404);
    const projectNames = allProjects.map(
      (project: { project_name: String }) => project.project_name
    );
    return res.status(200).json({ projectNames });
  } catch (error) {
    next(error);
  }
};

export const getTheOrgData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const orgData = await db.orgcontribution.findOne({
      where: {
        user_id: payload.user_id,
        project_id: payload.project_id,
      },
    });
    if (!orgData)
      throw new CustomError("no contribution found for this project", 404);
    return res.status(200).json({ data: orgData });
  } catch (error) {
    next(error);
  }
};

export const AllcontributionOfEmployee = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = req.user.id;
    const allContributions = await db.orgcontribution.findAll({
      where: { user_id: value },
    });
    if (!allContributions)
      throw new CustomError("no contributions founds", 404);
    return res.status(200).json({ data: allContributions });
  } catch (error) {
    next(error);
  }
};
