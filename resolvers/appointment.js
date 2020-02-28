const { UserInputError } = require("apollo-server-express");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Service = require("../models/Service");
const Auth = require("../utils/check-auth");
const EmailAuth = require("../utils/emailAuth");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const transportMail = require("../utils/transportMail");
const nodemailer = require("nodemailer");

module.exports = {
  Query: {
    appointment: async (_, { _id }) => {
      try {
        const getSingleAppointment = await Appointment.findById(_id);

        return getSingleAppointment;
      } catch (err) {
        throw err;
      }
    },
    appointments: async () => {
      try {
        const getAllAppointments = await Appointment.find().sort({
          createdAt: -1
        });

        return getAllAppointments;
      } catch {
        throw new Error("Error");
      }
    },
    currentAppointments: async () => {
      const getCurrentAppointments = await Appointment.find({
        $or: [{ status: "VERIFIED" }, { status: "RESCHEDULE" }]
      }).sort({ createdAt: -1 });

      return getCurrentAppointments;
    },
    appointmentHistory: async () => {
      const historyAppointments = await Appointment.find({
        $or: [{ status: "CANCELLED" }, { status: "DONE" }]
      }).sort({ updatedAt: -1 });

      return historyAppointments;
    },
    appointmentsByStatus: async (_, { status }) => {
      try {
        const appointmentStatus = await Appointment.find({ status }).sort({
          createdAt: -1
        });

        return appointmentStatus;
      } catch (err) {
        throw err;
      }
    },
    checkedAppointments: async (_, { employeeId, date }) => {
      try {
        const checkAppointments = await Appointment.find({
          employee: employeeId,
          date: new Date(date).toISOString()
        });

        return checkAppointments;
      } catch (err) {
        throw err;
      }
    },
    myAppointments: async (_, __, context) => {
      try {
        const { userId: user } = Auth(context);

        const getMyAppointments = await Appointment.find({
          user
        }).sort({ createdAt: -1 });

        return getMyAppointments;
      } catch (err) {
        throw err;
      }
    },
    myCurrentAppointment: async (_, __, context) => {
      try {
        const { userId: user } = Auth(context);

        const getCurrentAppointment = await Appointment.find({
          user,
          $or: [
            { status: "PENDING" },
            { status: "VERIFIED" },
            { status: "RESCHEDULE" }
          ]
        }).sort({ createdAt: -1 });

        return getCurrentAppointment;
      } catch (err) {
        throw err;
      }
    },
    myAppointmentHistory: async (_, __, context) => {
      try {
        const { userId: user } = Auth(context);

        const getAppointmentHistory = await Appointment.find({
          user,
          $or: [{ status: "CANCELLED" }, { status: "DONE" }]
        }).sort({ updatedAt: -1 });

        return getAppointmentHistory;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createGuestAppointment: async (
      _,
      {
        firstName,
        lastName,
        email,
        appointmentInput: { serviceId, employeeId, date, slot_start, message }
      }
    ) => {
      try {
      } catch (err) {
        throw err;
      }
    },
    createAppointment: async (
      _,
      {
        appointmentInput: { serviceId, employeeId, date, slot_start, message }
      },
      context
    ) => {
      try {
        const errors = {};
        const { userId: user } = Auth(context);

        const userInfo = await User.findOne({ _id: user });
        const userEmail = userInfo.email;

        const checkAppointment = await Appointment.findOne({
          user,
          status: { $ne: "CANCELLED" }
        });

        const checkTime = await Appointment.findOne({
          employee: employeeId,
          date: new Date(date).toISOString(),
          slot_start
        });

        if (!user) {
          errors.expiredLog =
            "Your credentials has been expired. Please log in again to continue";
          throw new UserInputError("Error Credentials", { errors });
        }

        if (checkAppointment) {
          errors.check = "You already have an appointment";
          throw new UserInputError("Error", { errors });
        }

        if (checkTime) {
          errors.checkTime = "Time unavailable";
          throw new UserInputError("Time error", { errors });
        }

        const service = await Service.findById(serviceId);
        const employee = await Employee.findById(employeeId);
        const duration = service.duration;
        const newAppointment = await new Appointment({
          user,
          service,
          employee,
          date: new Date(date).toISOString(),
          duration,
          slot_start,
          message,
          status: "PENDING"
        });

        const result = await newAppointment.save();
        console.log(newAppointment._id);
        jwt.sign(
          { _id: newAppointment._id },

          process.env.EMAIL_KEY,
          {
            expiresIn: "1d"
          },
          (err, emailToken) => {
            const url = `http://www.zessencefacialandspa.com/zessence/verified/${emailToken}`;

            transportMail({
              from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
              to: userEmail, // list of receivers
              subject: "Appointment Confirmation",
              text: "Good Day", // plain text body
              html: `Please click this email to confirm your appointment: <a href="${url}">${url}</a>`
            });
          }
        );

        return result;
      } catch (err) {
        throw err;
      }
    },
    cancelAppointment: async (_, { _id }) => {
      try {
        const errors = {};
        const appointmentDay = await Appointment.findById(_id);

        const userId = appointmentDay.user;
        const userInfo = await User.findOne({ _id: userId });
        const userName = userInfo.firstName + " " + userInfo.lastName;
        const userEmail = userInfo.email;

        const date = moment(appointmentDay.date).format("M/D/YYYY");

        if (
          date <=
          moment()
            .add(1, "d")
            .format("M/D/YYYY")
        ) {
          errors.invalidCancellation =
            "You can't cancel your appointment. If you wish to cancel your appointment, please contact our hotline";
          throw new UserInputError("Error", { errors });
        } else {
          const result = await Appointment.updateOne(
            { _id },
            { $set: { status: "CANCELLED" } }
          );

          transportMail({
            from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
            to: userEmail,
            subject: "Appointment Cancellation",
            text: `${userName}, we received your cancellation notice, and we want to let you know that we are sorry to hear of your decisions. If you would, please tell us why you have made this decision so our company can provide better service in the future.`,
            html: `<p><span style="font-weight: bold">${userName}</span>, we received your cancellation notice, and we want to let you know that we are sorry to hear of your decisions. If you would, please tell us why you have made this decision so our company can provide better service in the future.</p>`
          });

          return result;
        }
      } catch (err) {
        throw err;
      }
    },
    cancelTheAppointment: async (_, { _id }) => {
      try {
        const appointment = await Appointment.findById(_id);

        const userId = appointment.user;
        const userInfo = await User.findOne({ _id: userId });
        const userName = userInfo.firstName + " " + userInfo.lastName;
        const userEmail = userInfo.email;

        const result = await Appointment.updateOne(
          { _id },
          { $set: { status: "CANCELLED" } }
        );

        transportMail({
          from: '"Z Essence Facial and Spa"<smtp.mailtrap.io>',
          to: userEmail,
          subject: "Appointment Cancellation",
          text: `${userName}, we received your cancellation notice, and we want to let you know that we are sorry to hear of your decisions. If you would, please tell us why you have made this decision so our company can provide better service in the future.`,
          html: `<p><span style="font-weight: bold">${userName}</span>, we received your cancellation notice, and we want to let you know that we are sorry to hear of your decisions. If you would, please tell us why you have made this decision so our company can provide better service in the future.</p>`
        });

        return result;
      } catch (err) {
        throw err;
      }
    },
    doneAppointment: async (_, { _id }) => {
      try {
        const result = await Appointment.updateOne(
          { _id },
          { $set: { status: "DONE" } }
        );

        return result;
      } catch (err) {
        throw err;
      }
    },
    verifiedAppointment: async (_, { _id }) => {
      try {
        const result = await Appointment.updateOne(
          { _id },
          { $set: { status: "VERIFIED" } }
        );

        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
