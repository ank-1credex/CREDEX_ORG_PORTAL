const jwt = require("jsonwebtoken");

exports.verify_jwt = (token) => {
  let result;
  try {
    result = jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (error) {
    console.error(error);
  }
  return result;
};
