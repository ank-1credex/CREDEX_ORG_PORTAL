import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../interface/customRequest.interface";
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
    if (!project) return res.status(204).json({ message: "not found" });
    const data = {
      project_id: project.id,
      user_id: req.user.id,
      hours: payload.Hours,
      message: payload.Message,
      quarter: payload.Quarter,
      status: payload.Status,
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
    if (!allProjects) return res.status(204).json({ message: "not found" });
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
    if (!orgData) return res.status(204).json({ message: "not found" });
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
    const allContribution = await db.orgcontribution.findAll({
      where: { user_id: value },
    });
    if (!allContribution) return res.status(204).json({ message: "not found" });
    const project = await db.projects.findAll();
    return res.status(200).json({
      data: {
        allContribution: allContribution,
        Project: project,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeContributionData = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const employeData = await db.orgcontribution.findOne({
      where: { id: payload.id },
    });
    if (!employeData) return res.status(204).json({ message: "no data found" });
    await employeData.update({ ...payload, status: "Pending" });
    return res.status(200).json({ message: "succesfully updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployeeContributionData = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    await db.orgcontribution.destroy({
      where: {
        id: payload.id,
      },
    });

    return res.status(200).json({ message: "succesfully deleted" });
  } catch (error) {
    next(error);
  }
};
