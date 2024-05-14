import { Request, Response } from "express";

import { db } from "../../db/db";

export const updateTheOrgData = async (req: Request, res: Response) => {
  const payload = req.body;
  const orgData = await db.orgcontribution.findOne({
    where: {
      user_id: payload.user_id,
      project_id: payload.project_id,
    },
  });
  if (!orgData)
    return res.status(404).json({
      message: "no record found for updation",
    });
  orgData.status = payload.status;
  orgData.is_approved = payload.is_approved;
  await orgData.save();
  return res.status(200).json({ message: "succesfully updated" });
};

export const allMemeberOfManager = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const manager = await db.manager.findOne({
      where: { manager_name: payload.manager_name },
    });

    const allTheEmployee = await db.user.findAll({
      where: { ManagerId: manager.id },
    });
    const employeeDetails = allTheEmployee.map(
      (employee: { first_name: any; id: any }) => ({
        name: employee.first_name,
        id: employee.id,
      })
    );
    res.status(200).json({ data: employeeDetails });
  } catch (error) {
    res.status(500).json({ message: "failed to get the data" });
  }
};

export const allContributionByEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const payload = req.body;
    const user = await db.user.findOne({ where: { first_name: payload.name } });
    if (!user) return res.status(404).json({ message: "no user found" });
    const allContributions = await db.orgcontribution.findAll({
      where: { user_id: user.id },
    });
    if (allContributions.length === 0) {
      return res
        .status(404)
        .json({ message: "no conribution found for this Employee" });
    }
    return res.status(200).json({ contributiions: allContributions });
  } catch (error) {
    return res.status(500).json({ message: "failed to get the data" });
  }
};

export const uploadingProject = async (req: Request, res: Response) => {
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
    if (project)
      return res.status(409).json({ message: "project already exist !!" });
    project = await db.projects.create({
      client_id: client.id,
      project_name,
      is_billable,
    });
    return res.status(200).json({ projects: project });
  } catch (error) {
    return res.status(500).json({ message: "failed to create" });
  }
};
