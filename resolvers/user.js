require("dotenv").config({ path: "../env" });
const { UserInputError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const transportMail = require("../utils/transportMail");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Auth = require("../utils/check-auth");
// const { createWriteStream } = require("fs");
// const path = require("path");
const {
  validateUserCreateInput,
  validateUserLoginInput,
} = require("../utils/validators");

const { handleFileUpload } = require("../utils/handleFileUpload");

module.exports = {
  Query: {
    getUsers: async () => {
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
    },
  },
  Mutation: {
    register: async (
      _,
      {
        userInput: {
          firstName,
          lastName,
          contact,
          email,
          password,
          confirmPassword,
        },
      }
    ) => {
      try {
        //Validating Inputs
        const existingUser = await User.findOne({ email });

        const { valid, errors } = validateUserCreateInput(
          firstName,
          lastName,
          email,
          contact,
          password,
          confirmPassword
        );

        if (!valid) {
          console.log(errors);
          throw new UserInputError("Input Error", { errors });
        }

        if (existingUser) {
          console.log("existing user");
          errors.userTaken = "This email already taken.";
          throw new UserInputError("Error", { errors });
        }

       

        if (password.length < 1 || confirmPassword.length < 1) {
          errors.pwdEmpty = "Password must not be empty";
          throw new UserInputError("Error", { errors });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          firstName,
          lastName,
          email,
          contact,
          password: hashedPassword,
          active: false,
        });

        const result = await newUser.save();

        const userName = `${newUser.firstName} ${newUser.lastName}`;

        jwt.sign(
          { _id: newUser._id },

          process.env.EMAIL_KEY,
          {
            expiresIn: "12h",
          },
          (err, emailToken) => {
            const url = `https://www.zessencefacialandspa.com/account_verification/${emailToken}`;

            transportMail({
              from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
              to: email, // list of receivers
              subject: "Account Verification",
              text: `Hi, ${userName}, In order to make an appointment we ask you to please verify your email by clicking the link ${url}`, // plain text body
              temp: "accountverify",
              url,
              userName,
            });

            if (err) {
              console.log(err);
            }
          }
        );

        return result;
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

        if (!user.active) {
          errors.notVerify = `Your account has not been verified`;
          throw new UserInputError("Account not verified", { errors });
        }

        //* Token
        const token = await jwt.sign(
          { userId: user.id, email: user.email, firstName: user.firstName },

          process.env.REFRESH_SECRET_KEY,
          {
            expiresIn: "12h",
          }
        );

        return { ...user._doc, token };
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (
      _,
      {
        _id,
        firstName,
        lastName,
        contact,
        email,
        dateOfBirth,
        password,
        oldpassword,
      }
    ) => {
      try {
        let updateUser = {};
        let errors = {};

        const yousire = await User.findById(_id);

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

        if (dateOfBirth) {
          updateUser.dateOfBirth = new Date(dateOfBirth).toISOString();
        }

        if (password && oldpassword) {
          const isEqual = await bcrypt.compare(oldpassword, yousire.password);
          if (!isEqual) {
            errors.general = "Password not correct";
            throw new UserInputError("Error", { errors });
          } else {
            const hashedPassword = await bcrypt.hash(password, 12);

            updateUser.password = hashedPassword;
          }
        }

        const updated = await User.findByIdAndUpdate(_id, updateUser, {
          new: true,
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },
    addUserPhoto: async (_, { _id, file }) => {
      try {
        const { filename } = await file;

        const folder = "clients";

        const response = await handleFileUpload(file, folder);

        await User.updateOne(
          { _id },
          { $set: { photo: filename, imageURL: response.Location } }
        );

        console.log(response);
        console.log(response.Location);

        return response;
      } catch (err) {
        throw err;
      }
    },
    accountVerification: async (_, { _id }) => {
      try {
        const result = await User.updateOne(
          { _id },
          { $set: { active: true } }
        );

        return true;
      } catch (err) {
        throw err;
      }
    },
    resendVerifyEmail: async (_, { email }) => {
      let errors = {};
      const user = await User.findOne({ email });

      try {
        if (!user) {
          errors.emailNotExist = "Email not Exist";
          throw new UserInputError("Account not exist", { errors });
        }

        const userId = user._id;

        jwt.sign(
          { _id: userId },

          process.env.EMAIL_KEY,
          {
            expiresIn: "45m",
          },
          (err, emailToken) => {
            const url = `https://www.zessencefacialandspa.com/account_verification/${emailToken}`;

            transportMail({
              from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
              to: email, // list of receivers
              subject: "Account Verification",
              text: `Hi, ${user.firstName} ${user.lastName}, In order to make an appointment we ask you to please verify your email by clicking the link ${url}`, // plain text body
              temp: "accountverify",
              url,
              userName: `${user.firstName} ${user.lastName}`,
            });

            if (err) {
              console.log(err);
            }
          }
        );
        return true;
      } catch (err) {
        throw err;
      }
    },
    forgotPassword: async (_, { email }) => {
      const user = await User.findOne({ email });
      try {
        const { errors, valid } = validateUserLoginInput(email);

        if (!user) {
          errors.userX = "Email not found";
          throw new UserInputError("Email does not exist", { errors });
        }

        if (!valid) {
          throw new UserInputError("Input Error", { errors });
        }

        jwt.sign(
          { _id: user._id },

          process.env.EMAIL_KEY,
          {
            expiresIn: "20m",
          },
          (err, emailToken) => {
            const url = `https://www.zessencefacialandspa.com/account_reset_password/${emailToken}`;

            transportMail({
              from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
              to: email, // list of receivers
              subject: "Password Reset",
              text: `Hi, ${user.firstName} ${user.lastName}, In order to make an appointment we ask you to please verify your email by clicking the link ${url}`, // plain text body
              temp: "passwordreset",
              url,
              userName: `${user.firstName} ${user.lastName}`,
            });
          }
        );

        return true;
      } catch (err) {
        throw err;
      }
    },
    resetPassword: async (_, { _id, password, confirmPassword }) => {
      try {
        const user = await User.findById(_id);

        if (!user) throw new Error("USER NOT EXIST");

        const { valid, errors } = validateUserCreateInput(
          password,
          confirmPassword
        );

        if (!valid) {
          console.log(errors);
          throw new UserInputError("Input Error", { errors });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const updatePassword = await User.findOneAndUpdate(
          { _id },
          { $set: { password: hashedPassword } },
          { new: true, upsert: true }
        );
        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};
