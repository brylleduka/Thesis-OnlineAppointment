require("dotenv").config({ path: "../env" });
const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

// const EndAuth = ({ req }) => {
//   const authEndHeader = req.headers.authorization;
//   if (authEndHeader) {
//     // Bearer ....token
//     const employeeToken = authEndHeader.split("Basic ")[1];

//     if (employeeToken) {
//       try {
//         const employee = jwt.verify(
//           employeeToken,
//           process.env.REFRESH_SECRET_KEY
//         );
//         return employee;
//       } catch (err) {
//         throw new AuthenticationError("Invalid/Expired Token");
//       }
//     }

//     throw new AuthenticationError("Authentication must be Basic [token]");
//   }
//   throw new AuthenticationError("Authorization Header not provided");
// };

// const UserAuth = ({ req }) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     // Bearer ....token
//     const token = authHeader.split("Bearer ")[1];

//     if (token) {
//       try {
//         const user = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
//         console.log(user);
//         return user;
//       } catch (err) {
//         throw new AuthenticationError("Invalid/Expired Token");
//       }
//     }

//     throw new AuthenticationError("Authentication must be Bearer [token]");
//   }
//   throw new AuthenticationError("Authorization Header not provided");
// };
// module.exports = {
//   EndAuth,
//   UserAuth,
// };

module.exports = ({ req }) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer ....token
    const employeeToken = authHeader.split("Basic ")[1];
    const token = authHeader.split("Bearer ")[1];

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

    if (token) {
      try {
        const user = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }

    throw new AuthenticationError("Authentication must be Bearer [token]");
  }
  throw new AuthenticationError("Authorization Header not provided");
};
