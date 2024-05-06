const { Utils } = require("sequelize");
const { verify_jwt } = require("../utility/utility");

module.exports = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    token = token.replace("Bearer ", "");
    if (!token) res.status(401).json({ data: "Unauthorized Access" });
    result = verify_jwt(token);
    if (!result) {
      return res.status(403);
    }
    req.user = result;
    next();
  } catch (err) {
    console.log(err);
  }
};
