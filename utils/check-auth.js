require("dotenv").config({ path: "../env" });
const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

module.exports = ({ req }) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer ....token

    const token = authHeader.split("Bearer ")[1];
    const employeeToken = authHeader.split("Basic ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }

    if (employeeToken) {
      try {
        const employee = jwt.verify(
          employeeToken,
          process.env.REFRESH_SECRET_KEY
        );
        return employee;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }

    throw new AuthenticationError("Authentication must be Bearer [token]");
  }
  throw new AuthenticationError("Authorization Header not provided");
};
