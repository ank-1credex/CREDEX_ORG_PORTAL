const { QueryTypes } = require('sequelize');

const db = require('../../db/db');

exports.addHoursInOrgContribution = async (req, res) => {
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
        }
        const saveOrghours = await db.orgcontribution.create(data);
        res.status(200).json({ data: saveOrghours });
    }
    catch (err) {
        throw err;
    }
}
exports.getOrgHoursByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const userOrgContributionData = await db.sequelize.query(`
            SELECT 
                org_contribution.*,
                users.first_name AS user_name,
                projects.project_name
            FROM
                org_contribution
            JOIN
                users ON org_contribution.user_id = users.id
            JOIN
                projects ON org_contribution.project_id = projects.id
            WHERE
                org_contribution.user_id = :userId;
        `, {
            replacements: { userId: id },
            type: QueryTypes.SELECT
        });

        if (!userOrgContributionData || userOrgContributionData.length === 0) {
            return res.status(400).json({
                data: "No org contribution found"
            });
        }

        res.status(200).json({ userOrgContributionData });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};


exports.getProjects = async (req, res) => {
    try {
        const projects = await db.projects.findAll();
        if (!projects) {
            res.status(200).send("No user found");
        }
        res.status(200).json({
            data: projects,
        })
    }
    catch (err) {
        throw err;
    }
}