require("dotenv").config({ path: "../env" });
const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

module.exports = ({ req }) => {
  const emailAuthHeader = req.params.emailToken;

  try {
    const email = jwt.verify(emailAuthHeader, process.env.EMAIL_KEY);
    return email;
  } catch (err) {
    throw new AuthenticationError("Invalid/Expired Token");
  }
};
