import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utility/customError";
import { db } from "../../db/db";

export const updateTheOrgData = async (
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
    if (!orgData) throw new CustomError("no record found", 404);
    orgData.status = payload.status;
    orgData.is_approved = payload.is_approved;
    await orgData.save();
    return res.status(200).json({ message: "succesfully updated" });
  } catch (error) {
    next(error);
  }
};

export const allMemeberOfManager = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const manager = await db.manager.findOne({
      where: { manager_name: payload.manager_name },
    });

    const allTheEmployee = await db.user.findAll({
      where: { ManagerId: manager.id },
    });
    const employeeDetails = allTheEmployee.map(
      (employee: { first_name: string; id: number }) => ({
        name: employee.first_name,
        id: employee.id,
      })
    );
    res.status(200).json({ data: employeeDetails });
  } catch (error) {
    next(error);
  }
};

export const allContributionByEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const user = await db.user.findOne({ where: { first_name: payload.name } });
    if (!user) throw new CustomError("no user found with name", 404);
    const allContributions = await db.orgcontribution.findAll({
      where: { user_id: user.id },
    });
    if (allContributions.length === 0) {
      throw new CustomError("no contibution found for this employee", 404);
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
    const { project_name, client_name, address, is_billable } = payload;
    let client = await db.client.findOne({
      where: { client_name: client_name },
    });
    if (!client) client = await db.client.create({ client_name, address });
    let project = await db.projects.findOne({
      where: { project_name: project_name },
    });
    if (project) throw new CustomError("project already exists", 409);
    project = await db.projects.create({
      client_id: client.id,
      project_name,
      is_billable,
    });
    return res.status(200).json({ projects: project });
  } catch (error) {
    next(error);
  }
};