require("dotenv").config({ path: "../env" });
const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Auth = require("../utils/check-auth");
const { createWriteStream } = require("fs");
const path = require("path");
const {
  validateUserCreateInput,
  validateUserLoginInput
} = require("../utils/validators");

module.exports = {
  Query: {
    getUsers: async (_, __, context) => {
      try {
        const getAllUsers = await User.find();

        return getAllUsers;
      } catch (err) {
        throw err;
      }
    },
    user: async (_, { _id }) => {
      const getUser = await User.findById(_id);

      return getUser;
    }
  },
  Mutation: {
    register: async (
      _,
      { userInput: { firstName, lastName, email, password, confirmPassword } }
    ) => {
      try {
        //Validating Inputs
        const existingUser = await User.findOne({ email });

        const { valid, errors } = validateUserCreateInput(
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        );

        if (existingUser) {
          errors.userTaken = "This email already taken.";
          throw new UserInputError("Error", { errors });
        }

        if (!valid) {
          throw new UserInputError("Input Error", { errors });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword
        });

        const result = await newUser.save();
        return true;
      } catch (err) {
        throw err;
      }
    },
    userLogin: async (_, { email, password }) => {
      try {
        const { errors, valid } = validateUserLoginInput(email, password);
        const user = await User.findOne({ email });

        if (!user) {
          errors.userX = "Email not found";
          throw new UserInputError("Email does not exist", { errors });
        }

        if (!valid) {
          throw new UserInputError("Input Error", { errors });
        }
        //Check if password is incorrect return an error
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          errors.general = "Email/Password not correct";
          throw new UserInputError("Error", { errors });
        }
        //* Token
        const token = await jwt.sign(
          { userId: user.id, email: user.email, firstName: user.firstName },

          process.env.REFRESH_SECRET_KEY,
          {
            expiresIn: "1h"
          }
        );

        return { ...user._doc, token };
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (_, { _id, firstName, lastName, contact, email }) => {
      try {
        let updateUser = {};

        if (firstName) {
          updateUser.firstName = firstName;
        }

        if (lastName) {
          updateUser.lastName = lastName;
        }

        if (email) {
          updateUser.email = email;
        }

        if (contact) {
          updateUser.contact = contact;
        }

        const updated = await User.findByIdAndUpdate(_id, updateUser, {
          new: true
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },
    addUserPhoto: async (_, { _id, file }) => {
      try {
        const { createReadStream, filename } = await file;
        await new Promise(res =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/users", filename)
            ).on("close", res)
          )
        );

        await User.updateOne({ _id }, { $set: { photo: filename } });

        return true;
      } catch (err) {
        throw err;
      }
    }
  }
};
