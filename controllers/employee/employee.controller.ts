import { Request, Response } from "express";
import { CustomRequest } from "../../interfaces/customRequest.interface";
import { db } from "../../db/db";

export const addHoursInOrgContribution = async (
  req: Request,
  res: Response
) => {
  try {
    const payload = req.body;
    const data = {
      project_id: payload.project_id,
      user_id: payload.user_id,
      hours: payload.hours,
      actual_hours: payload.actual_hours,
      is_approved: payload.is_approved,
      message: payload.message,
      approval_mail_screenshot: payload.approval_mail_screenshot,
      status: payload.status,
    };
    const saveOrghours = await db.orgcontribution.create(data);
    res.status(200).json({ data: saveOrghours });
  } catch (err) {
    throw err;
  }
};

export const getAllProjects = async (req: CustomRequest, res: Response) => {
  try {
    const allProjects = await db.projects.findAll();
    if (!allProjects)
      return res.status(404).json({ message: "no project found !!" });
    const projectNames = allProjects.map(
      (project: { project_name: String }) => project.project_name
    );

    return res.status(200).json({ projectNames });
  } catch (error) {
    res.status(500).json({ message: "failed to get data " });
  }
};

export const getTheOrgData = async (req: Request, res: Response) => {
  const payload = req.body;
  const orgData = await db.orgcontribution.findOne({
    where: {
      user_id: payload.user_id,
      project_id: payload.project_id,
    },
  });
  if (!orgData)
    return res
      .status(404)
      .json({ message: "no contribution found for this project" });
  return res.status(200).json({ data: orgData });
};

