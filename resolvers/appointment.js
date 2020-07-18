const { UserInputError } = require("apollo-server-express");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Service = require("../models/Service");
const Auth = require("../utils/check-auth");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const transportMail = require("../utils/transportMail");
const bcrypt = require("bcryptjs");
const Nexmo = require("nexmo");

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
        const getAllAppointments = await Appointment.find({
          $or: [{ status: "DONE" }, { status: "CANCELLED" }],
        }).sort({
          createdAt: -1,
        });

        return getAllAppointments;
      } catch (err) {
        throw err;
      }
    },
    checkedViewAppointments: async () => {
      try {
        const getViewAppointments = await Appointment.find({
          view: false,
        }).sort({
          createdAt: -1,
        });

        return getViewAppointments;
      } catch (err) {
        throw err;
      }
    },
    currentAppointments: async () => {
      const getCurrentAppointments = await Appointment.find({
        $or: [{ status: "VERIFIED" }, { status: "PENDING" }],
      }).sort({ createdAt: -1 });

      // const getCurrentAppointments = await Appointment.find({
      //   $or: [{ status: "INPROGRESS" }],
      // }).sort({ createdAt: -1 });

      return getCurrentAppointments;
    },
    appointmentHistory: async () => {
      const historyAppointments = await Appointment.find({
        $or: [
          { status: "CANCELLED" },
          { status: "DONE" },
          { status: "RESCHEDULED" },
        ],
      }).sort({ updatedAt: -1 });

      return historyAppointments;
    },
    appointmentsByStatus: async (_, { status }) => {
      try {
        const appointmentStatus = await Appointment.find({ status }).sort({
          createdAt: -1,
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
          date,
          $or: [
            { status: "PENDING" },
            { status: "VERIFIED" },
            { status: "DONE" },
          ],
        });

        // const checkAppointments = await Appointment.find({
        //   employee: employeeId,
        //   date: new Date(date).toLocaleDateString(),
        //   $or: [{ status: "INPROGRESS" }, { status: "DONE" }],
        // });

        return checkAppointments;
      } catch (err) {
        throw err;
      }
    },
    myAppointments: async (_, __, context) => {
      try {
        const { userId: user } = Auth(context);

        const getMyAppointments = await Appointment.find({
          user,
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
          $or: [{ status: "PENDING" }, { status: "VERIFIED" }],
        }).sort({ createdAt: -1 });

        // const getCurrentAppointment = await Appointment.find({
        //   user,
        //   $or: [{ status: "INPROGRESS" }],
        // }).sort({ createdAt: -1 });

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
          $or: [
            { status: "CANCELLED" },
            { status: "DONE" },
            { status: "RESCHEDULED" },
          ],
        }).sort({ updatedAt: -1 });

        return getAppointmentHistory;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createUserExistAppointment: async (
      _,
      {
        userId,
        appointmentInput: { serviceId, employeeId, date, slot_start, message },
      }
    ) => {
      try {
        const userInfo = await User.findOne({ _id: userId });
        const userEmail = userInfo.email;

        const checkAppointment = await Appointment.findOne({
          user: userId,
          $or: [{ status: "PENDING" }, { status: "VERIFIED" }],
        });

        // const checkAppointment = await Appointment.findOne({
        //   user: userId,
        //   $or: [{ status: "INPROGRESS" }],
        // });

        const checkTime = await Appointment.findOne({
          employee: employeeId,
          date: new Date(date).toLocaleDateString(),
          slot_start,
        });

        if (checkAppointment) {
          errors.check = "User already have an appointment";
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
          user: userId,
          service,
          employee,
          date: new Date(date).toLocaleDateString(),
          duration,
          slot_start,
          message,
          // status: "INPROGRESS",
          status: "VERIFIED",
        });

        const result = await newAppointment.save();

        transportMail({
          from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
          to: userEmail, // list of receivers
          subject: "Appointment Confirmation",
          text: "Good Day", // plain text body
          html: `Your appointment has been set`,
        });

        return result;
      } catch (err) {
        throw err;
      }
    },
    createAppointment: async (
      _,
      {
        appointmentInput: { serviceId, employeeId, date, slot_start, message },
      },
      context
    ) => {
      try {
        const errors = {};
        const { userId: user } = Auth(context);

        const userInfo = await User.findOne({ _id: user });
        const userEmail = userInfo.email;
        const userName = `${userInfo.firstName} ${userInfo.lastName}`;
        const userContact = userInfo.contact;

        const checkAppointment = await Appointment.findOne({
          user,
          date,
          $or: [{ status: "PENDING" }, { status: "VERIFIED" }],
          // $or: [{ status: "INPROGRESS" }],
        });

        const checkTime = await Appointment.findOne({
          employee: employeeId,
          date,
          slot_start,
          $or: [
            { status: "PENDING" },
            { status: "VERIFIED" },
            // { status: "INPROGRESS" },
            { status: "DONE" },
          ],
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
        const serviceName = service.name;
        const employee = await Employee.findById(employeeId);
        const employeeName = `${employee.title} ${employee.firstName} ${employee.lastName}`;
        const duration = service.duration;
        const newAppointment = await new Appointment({
          user,
          service,
          employee,
          date,
          duration,
          slot_start,
          message,
          // status: "INPROGRESS",
          status: "PENDING",
          view: false,
        });

        const result = await newAppointment.save();

        jwt.sign(
          {
            _id: newAppointment._id,
          },

          process.env.EMAIL_KEY,
          {
            expiresIn: "1d",
          },
          (err, emailToken) => {
            // const url = `http://www.zessencefacialandspa.com/verified/${emailToken}`;
            const url = `http://localhost:3000/verified/${emailToken}`;

            transportMail({
              from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
              to: userEmail, // list of receivers
              subject: "Appointment Confirmation",
              text: "Good Day", // plain text body
              temp: "appointmentverify",
              url,
              userName,
              serviceName,
              employeeName,
              date: moment(date).format("LL"),
              time: slot_start,
            });
          }
        );

        // if (userContact) {
        //   const nexmo = new Nexmo({
        //     apiKey: "db47cee1",
        //     apiSecret: "K3yqI72Vi4zIMoGd",
        //   });

        //   const from = "Z Essence";
        //   const to = `63${userContact}`;
        //   const text = `Hello ${userInfo.firstName}! Thank you for making an appointment with us.Please visit your account or check your email to see details of your appointment. Z Essence Facial and Spa`;

        //   nexmo.message.sendSms(from, to, text);
        // }

        return result;
      } catch (err) {
        throw err;
      }
    },
    cancelAppointment: async (
      _,
      { _id, userEmail, userName, serviceName, employeeName, date, time, note }
    ) => {
      try {
        const result = await Appointment.findOneAndUpdate(
          { _id },
          { $set: { status: "CANCELLED", note } },
          {
            new: true,
            upsert: true,
          }
        );

        transportMail({
          from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
          to: userEmail,
          subject: "Appointment Cancellation",
          text: `${userName}, we received your cancellation notice, and we want to let you know that we are sorry to hear of your decisions. If you would, please tell us why you have made this decision so our company can provide better service in the future.`,
          temp: "cancel",
          userName,
          employeeName,
          serviceName,
          date: moment(date).format("LL"),
          time,
        });

        return true;
      } catch (err) {
        throw err;
      }
    },
    cancelTheAppointment: async (_, { _id, note }) => {
      try {
        const theappointment = await Appointment.findById(_id);

        const userId = theappointment.user;
        const serviceId = theappointment.service;
        const employeeId = theappointment.employee;

        const userInfo = await User.findOne({ _id: userId });
        const userName = `${userInfo.firstName} ${userInfo.lastName}`;
        const userEmail = userInfo.email;

        const service = await Service.findById(serviceId);
        const serviceName = service.name;
        const employee = await Employee.findById(employeeId);
        const employeeName = `${employee.title} ${employee.firstName} ${employee.lastName}`;

        const date = theappointment.date;
        const time = theappointment.slot_start;

        const cancelResult = await Appointment.findOneAndUpdate(
          { _id },
          { $set: { status: "CANCELLED", note } }
        );

        transportMail({
          from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
          to: userEmail,
          subject: "Appointment Cancellation",
          text: `${userName}, we received your cancellation notice, and we want to let you know that we are sorry to hear of your decisions. If you would, please tell us why you have made this decision so our company can provide better service in the future.`,
          temp: "cancel",
          userName,
          employeeName,
          serviceName,
          date: moment(date).format("LL"),
          time,
        });

        return cancelResult;
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
        const appointmentInfo = await Appointment.findById(_id);

        const userId = appointmentInfo.user;
        // const serviceId = appointmentInfo.service;
        // const employeeId = appointmentInfo.employee;

        const userInfo = await User.findById(userId);
        const userName = `${userInfo.firstName} ${userInfo.lastName}`;
        const userEmail = userInfo.email;

        // const service = await Service.findById(serviceId);
        // const serviceName = service.name;
        // const employee = await Employee.findById(employeeId);
        // const employeeName = `${employee.title} ${employee.firstName} ${employee.lastName}`;

        // const date = appointmentInfo.date;
        // const time = appointmentInfo.slot_start;

        const result = await Appointment.updateOne(
          { _id },
          { $set: { status: "VERIFIED" } }
        );

        transportMail({
          from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
          to: userEmail,
          subject: "Appointment Verified",
          text: `${userName}, Your appointment has been verified. Please visit your account for more info.`,
          temp: "index",
          userName,
        });

        return true;
      } catch (err) {
        throw err;
      }
    },
    reschedAppointment: async (
      _,
      {
        _id,
        status,
        isAdmin,
        appointmentInput: { serviceId, employeeId, date, slot_start, message },
      }
    ) => {
      let errors = {};
      const appointment = await Appointment.findById(_id);
      const user = appointment.user;
      const userInfo = await User.findOne({ _id: user });
      const userName = userInfo.firstName + " " + userInfo.lastName;
      const userEmail = userInfo.email;

      // const checkAppointment = await Appointment.findOne({
      //   user: user,
      //   $or: [{ status: "PENDING" }, { status: "VERIFIED" }]
      // });

      const checkTime = await Appointment.findOne({
        employee: employeeId,
        date: new Date(date).toLocaleDateString(),
        slot_start,
      });

      // if (checkAppointment) {
      //   errors.check = "User already have an appointment";
      //   throw new UserInputError("Error", { errors });
      // }

      if (checkTime) {
        errors.checkTime = "Time unavailable";
        throw new UserInputError("Time error", { errors });
      }

      const service = await Service.findById(serviceId);
      const serviceName = service.name;
      const employee = await Employee.findById(employeeId);
      const employeeName = `${employee.title} ${employee.firstName} ${employee.lastName}`;
      const duration = service.duration;

      const rescheduleAppointment = await new Appointment({
        user,
        service,
        employee,
        date: new Date(date).toLocaleDateString(),
        duration,
        slot_start,
        message,
        note: "Reschedule Appointment",
        status,
        view: false,
        reschedule: {
          appointmentId: _id,
          new: true,
        },
      });

      const result = await rescheduleAppointment.save();

      await Appointment.updateOne(
        { _id },
        {
          $set: {
            status: "RESCHEDULED",
            note: "For Rescheduling",
            reschedule: { appointmentId: rescheduleAppointment, new: false },
          },
        }
      );

      transportMail({
        from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
        to: userEmail, // list of receivers
        subject: "Appointment Rescheduling",
        text: "Good Day", // plain text body
        temp: "index",
        // url,
        userName,
        serviceName,
        employeeName,
        date: moment(date).format("LL"),
        time: slot_start,
      });

      // if (!isAdmin) {
      //   jwt.sign(
      //     { _id: rescheduleAppointment._id },

      //     process.env.EMAIL_KEY,
      //     {
      //       expiresIn: "1d",
      //     },
      //     (err, emailToken) => {
      //       const url = `https://www.zessencefacialandspa.com/verified/${emailToken}`;

      //       transportMail({
      //         from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
      //         to: userEmail, // list of receivers
      //         subject: "Appointment Confirmation",
      //         text: "Good Day", // plain text body
      //         temp: "index",
      //         url,
      //         userName,
      //         serviceName,
      //         employeeName,
      //         date: moment(date).format("LL"),
      //         time: slot_start,
      //       });
      //     }
      //   );
      // } else {
      //   transportMail({
      //     from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
      //     to: userEmail, // list of receivers
      //     subject: "Appointment Rescheduling",
      //     text: "Good Day", // plain text body
      //     temp: "resched",
      //     userName,
      //     serviceName,
      //     employeeName,
      //     date: moment(date).format("LL"),
      //     time: slot_start,
      //   });
      // }

      return result;
    },
    viewAppointments: async (_, { view }) => {
      try {
        const result = Appointment.updateMany(
          {},
          { $set: { view } },
          { upsert: true }
        );

        return result;
      } catch (err) {
        throw err;
      }
    },
  },
};
