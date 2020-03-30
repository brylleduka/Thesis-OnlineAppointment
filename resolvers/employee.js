const Employee = require("../models/Employee");
const Schedule = require("../models/Schedule");
const Service = require("../models/Service");
const { UserInputError, ForbiddenError } = require("apollo-server-express");
const Auth = require("../utils/check-auth");
const { validateEmployeeLoginInput } = require("../utils/validators");
const { createWriteStream, createReadStream } = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

module.exports = {
  Query: {
    employees: async () => {
      try {
        const getAllEmployee = await Employee.find().sort({ createdAt: -1 });

        return getAllEmployee;
      } catch (err) {
        throw err;
      }
    },
    employeesByRole: async (_, { role }) => {
      try {
        const employeesRole = await Employee.find({ role }).sort({
          createdAt: -1
        });

        return employeesRole;
      } catch (err) {
        throw err;
      }
    },
    aestheticiansReceps: async (_, { limit }) => {
      try {
        const employeesAesthe = await Employee.find({
          role: { $ne: "ADMIN" }
        })
          .sort({
            createdAt: -1
          })
          .limit(limit ? limit : 0);

        return employeesAesthe;
      } catch (err) {
        throw err;
      }
    },
    employee: async (_, { _id }) => {
      try {
        const getEmployee = await Employee.findById(_id);

        return getEmployee;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    employeeLogin: async (_, { empId, password }) => {
      try {
        const { errors, valid } = validateEmployeeLoginInput(empId, password);

        if (!valid) {
          throw new UserInputError("Input Error", { errors });
        }

        const employee = await Employee.findOne({ empId });

        if (!employee) {
          errors.general = "Employee not found";
          throw new UserInputError("Employee not found", { errors });
        }

        const isEqual = await bcrypt.compare(password, employee.password);

        if (!isEqual) {
          errors.isNotEqual = "Invalid Credentials";
          throw new UserInputError("Invalid Credentials", { errors });
        }

        const employeeToken = await jwt.sign(
          { id: employee.id, role: employee.role, level: employee.level },

          process.env.REFRESH_SECRET_KEY,
          {
            expiresIn: "1d"
          }
        );

        return { ...employee._doc, id: employee._id, employeeToken };
      } catch (err) {
        throw err;
      }
    },
    createEmployee: async (
      _,
      {
        employeeInput: { title, firstName, lastName, contact, email, role },
        scheduleInput: { day, workStart, workLength, breakStart, breakLength }
      },
      context
    ) => {
      const { role: authRole, level: authLevel } = Auth(context);

      try {
        const pseudoEmployeeId =
          "ZE-" + (Math.random() + 1).toString(36).substring(7);
        //LEVEL
        let level =
          role === "ADMIN"
            ? 3
            : role === "RECEPTIONIST"
            ? 2
            : role === "AESTHETICIAN"
            ? 1
            : 0;
        //check if authorize
        if (authRole !== "ADMIN" || authLevel < 3) {
          throw new ForbiddenError("You are not authorized");
        }

        const newSchedule = await new Schedule({
          day,
          workStart,
          workLength,
          breakStart,
          breakLength
        });

        await newSchedule.save();

        const hashedPassword = await bcrypt.hash(pseudoEmployeeId, 12);

        const newEmployee = await new Employee({
          empId: pseudoEmployeeId,
          title,
          firstName,
          lastName,
          contact,
          email,
          bio: "",
          role,
          level,
          password: hashedPassword,
          schedule: newSchedule
        });

        const result = await newEmployee.save();

        return result;
      } catch (err) {
        throw err;
      }
    },
    addEmployeePhoto: async (_, { _id, file }) => {
      try {
        const { createReadStream, filename } = await file;
        await new Promise(res =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/employees", filename)
            ).on("close", res)
          )
        );

        const employee = await Employee.updateOne(
          { _id },
          { $set: { photo: filename } }
        );

        return true;
      } catch (err) {
        throw err;
      }
    },
    updateEmployee: async (
      _,
      {
        _id,
        title,
        empId,
        firstName,
        lastName,
        contact,
        email,
        role,
        bio,
        day,
        dateOfBirth,
        workStart,
        workLength,
        breakStart,
        breakLength,
        password,
        oldpassword
      },
      context
    ) => {
      const { id: authId, role: authRole } = Auth(context);

      try {
        let errors = {};
        let updateEmployee = {};
        let updateSchedule = {};

        const employee = await Employee.findById(_id);
        const scheduleId = employee.schedule;

        if (empId) {
          updateEmployee.empId = empId;
        }
        if (title) {
          updateEmployee.title = title;
        }

        if (firstName) {
          updateEmployee.firstName = firstName;
        }

        if (lastName) {
          updateEmployee.lastName = lastName;
        }

        if (contact) {
          updateEmployee.contact = contact;
        }

        if (email) {
          updateEmployee.email = email;
        }
        if (bio) {
          updateEmployee.bio = bio;
        }

        if (role) {
          updateEmployee.role = role;
        }

        if (day) {
          updateSchedule.day = day;
        }
        if (workStart) {
          updateSchedule.workStart = workStart;
        }
        if (workLength) {
          updateSchedule.workLength = workLength;
        }

        if (breakStart) {
          updateSchedule.breakStart = breakStart;
        }

        if (breakLength) {
          updateSchedule.breakLength = breakLength;
        }

        if (dateOfBirth) {
          updateEmployee.dateOfBirth = new Date(dateOfBirth).toISOString();
        }

        if (password && oldpassword) {
          const isEqual = await bcrypt.compare(oldpassword, employee.password);
          if (!isEqual) {
            errors.general = "Password not correct";
            throw new UserInputError("Error", { errors });
          } else {
            const hashedPassword = await bcrypt.hash(password, 12);

            updateEmployee.password = hashedPassword;
          }
        }

        // await Schedule.findOne(
        //   { _id: scheduleId },
        //   {
        //     $set: {
        //       day: day,
        //       workStart: workStart,
        //       workLenght: workLength,
        //       breakStart: breakStart,
        //       breakLength: breakLength
        //     }
        //   }
        // );

        await Schedule.updateOne(
          { _id: scheduleId._id },

          updateSchedule
        );

     

        const updated = await Employee.findByIdAndUpdate(_id, updateEmployee, {
          new: true
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },
    deleteEmployee: async (_, { _id }, context) => {
      try {
        const { role, level } = Auth(context);

        const employee = await Employee.findById(_id);
        const scheduleId = employee.schedule;

        if (role !== "ADMIN" || level < 3) {
          throw new ForbiddenError("not authorized to do this action");
        }

        await Schedule.deleteOne({ _id: scheduleId });
        await Service.updateMany({}, { $pull: { employees: _id } });
        await Employee.findByIdAndDelete(_id);

        return true;
      } catch (err) {
        throw err;
      }
    },
    addService: async (_, { employeeId, serviceId }) => {
      try {
        await Employee.updateOne(
          { _id: employeeId },
          { $addToSet: { services: serviceId } }
        );

        await Service.updateMany(
          { _id: serviceId },
          { $addToSet: { employees: employeeId } }
        );

        const employee = await Employee.findById(employeeId);
        // const service = await Service.findById(serviceId);

        return employee;
      } catch (err) {
        throw err;
      }
    },
    removeService: async (_, { employeeId, serviceId }, context) => {
      try {
        const updatedService = await Employee.updateOne(
          { _id: employeeId },
          { $pull: { services: serviceId } }
        );
        await Service.updateOne(
          { _id: serviceId },
          { $pull: { employees: employeeId } }
        );

        return true;
      } catch (err) {
        throw err;
      }
    }
  }
};
