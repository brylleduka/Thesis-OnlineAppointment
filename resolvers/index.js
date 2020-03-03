const userResolvers = require("./user");
const serviceResolvers = require("./service");
const categoryResolvers = require("./category");
const employeeResolvers = require("./employee");
const appointmentResolvers = require("./appointment");
const inquiryResolvers = require("./inquiry");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...serviceResolvers.Query,
    ...categoryResolvers.Query,
    ...employeeResolvers.Query,
    ...appointmentResolvers.Query,
    ...inquiryResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...employeeResolvers.Mutation,
    ...appointmentResolvers.Mutation,
    ...inquiryResolvers.Mutation
  }
};
