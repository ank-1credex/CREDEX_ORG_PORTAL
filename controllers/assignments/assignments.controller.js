const db = require('../../db/db');

exports.addAssignment = async (req, res) => {
    try {
        const payload = req.body;
        const assignment = await db.assignment.findOne({ where: { and: { user_id: payload.user_id, project_id: payload.project_id } } });
        if (assignment) {
            return res.status(400).json({
                data:"Already Exists"
            })
        }
        const data = {
            project_id: payload.project_id,
            assignment_id: payload.assignment_id
        }
        const createAssignment = await db.assignment.create(data);
        res.status(200).json({ data: createAssignment })
    }
    catch (err) {
        console.log(err);
    }
}
exports.getAssignment = async (req, res) => {
    try {
        const payload = req.params;
        const assignment = await db.assignment.findOne({ where: { and: { user_id: payload.user_id, project_id: payload.project_id } } });
        if (!assignment) {
            return res.status(400).json({
                data:"No assignment found"
            })
        }
        res.status(200).json({ data: assignment })
    }
    catch (err) {
        console.log(err);
    }
}