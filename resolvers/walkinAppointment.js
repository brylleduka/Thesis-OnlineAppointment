const { UserInputError } = require("apollo-server-express");
const Appointment = require("../models/Appointment");
const WalkinAppointment = require("../models/WalkinAppointment");
const WalkinClient = require("../models/WalkinClient");
const Employee = require("../models/Employee");
const Service = require("../models/Service");
const { validateUserCreateInput } = require("../utils/validators");
const transportMail = require("../utils/transportMail");
const moment = require("moment");

const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    walkinAppointment: async (_, { _id }) => {
      try {
        const getSingleWalkinAppointment = await WalkinAppointment.findById(
          _id
        );

        return getSingleWalkinAppointment;
      } catch (err) {
        throw err;
      }
    },
    walkinAppointments: async () => {
      try {
        const getAllWalkinAppointments = await WalkinAppointment.find({
          $or: [{ status: "DONE" }, { status: "CANCELLED" }],
        }).sort({
          createdAt: -1,
        });

        return getAllWalkinAppointments;
      } catch (err) {
        throw err;
      }
    },
    currentWalkinAppointments: async () => {
      const getCurrentWalkinAppointments = await WalkinAppointment.find({
        $or: [{ status: "VERIFIED" }, { status: "PENDING" }],
      }).sort({ createdAt: -1 });

      return getCurrentWalkinAppointments;
    },
    walkinAppointmentHistory: async () => {
      const historyWalkinAppointments = await WalkinAppointment.find({
        $or: [
          { status: "CANCELLED" },
          { status: "DONE" },
          { status: "RESCHEDULED" },
        ],
      }).sort({ updatedAt: -1 });

      return historyWalkinAppointments;
    },
    walkinAppointmentsByStatus: async (_, { status }) => {
      try {
        const appointmentStatus = await WalkinAppointment.find({ status }).sort(
          {
            createdAt: -1,
          }
        );

        return appointmentStatus;
      } catch (err) {
        throw err;
      }
    },
    checkedWalkinAppointments: async (_, { employeeId, date }) => {
      try {
        const checkWalkinAppointments = await WalkinAppointment.find({
          employee: employeeId,
          date: new Date(date).toLocaleDateString(),
          $or: [
            { status: "PENDING" },
            { status: "VERIFIED" },
            { status: "DONE" },
          ],
        });

        return checkWalkinAppointments;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createWalkinAppointment: async (
      _,
      {
        firstName,
        lastName,
        contact,
        email,
        address,
        serviceId,
        employeeId,
        date,
        slot_start,
      }
    ) => {
      try {
        const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        let errors = {};

        if (firstName && firstName.trim() === "") {
          errors.firstName = "First name must not be empty";
          throw new UserInputError("Error", { errors });
        }

        if (lastName && lastName.trim() === "") {
          errors.lastName = "Last name must not be empty";
          throw new UserInputError("Error", { errors });
        }

        if (email && !email.match(regex)) {
          errors.emailX = "Email must be a valid  email address";
          throw new UserInputError("Error", { errors });
        }

        const checkTime = await Appointment.findOne({
          employee: employeeId,
          date: new Date(date).toLocaleDateString(),
          slot_start,
          $or: [
            { status: "PENDING" },
            { status: "VERIFIED" },
            // { status: "INPROGRESS" },
            { status: "DONE" },
          ],
        });

        const checkWalkinTime = await WalkinAppointment.findOne({
          employee: employeeId,
          date: new Date(date).toLocaleDateString(),
          slot_start,
          $or: [
            { status: "PENDING" },
            { status: "VERIFIED" },
            // { status: "INPROGRESS" },
            { status: "DONE" },
          ],
        });
        // CHECK IF TIME IS OCCUPIED
        if (checkTime || checkWalkinTime) {
          errors.checkTime = "Time unavailable";
          throw new UserInputError("Time error", { errors });
        }

        const service = await Service.findById(serviceId);
        const serviceName = service.name;
        const employee = await Employee.findById(employeeId);
        const employeeName = `${employee.title} ${employee.firstName} ${employee.lastName}`;
        const duration = service.duration;

        const newWalkinClient = await new WalkinClient({
          firstName,
          lastName,
          contact,
          email,
          address,
        });

        await newWalkinClient.save();

        const newWalkinAppointment = await new WalkinAppointment({
          walkinClient: newWalkinClient,
          service,
          employee,
          date,
          duration,
          slot_start,
          status: "VERIFIED",
        });

        const resultWalkinAppoint = await newWalkinAppointment.save();

        const userName = `${newWalkinClient.firstName} ${newWalkinClient.lastName}`;
        if (email) {
          transportMail({
            from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
            to: email, // list of receivers
            subject: "Appointment Acknowledgement",
            text: "Good Day", // plain text body
            temp: "index",
            userName,
            serviceName,
            employeeName,
            date: moment(date).format("LL"),
            time: slot_start,
          });
        }

        return resultWalkinAppoint;
      } catch (err) {
        throw err;
      }
    },
  },
};
