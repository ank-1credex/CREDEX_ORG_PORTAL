const db = require("../../db/db");

exports.createRole = async (req, res) => {
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
    const saveRole = await db.role.create(data);
    res.status(200).json({ data: saveRole });
  } catch (err) {
    console.log(err);
  }
};

exports.getRoleById = async (req, res) => {
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

exports.getRoles = async (req, res) => {
  try {
    const roles = await db.role.find();
    if (!role) {
      return res.status(400).json({
        data: "No role found",
      });
    }
    res.status(200).json({ data: roles });
  } catch (err) {
    console.log(err);
  }
};
