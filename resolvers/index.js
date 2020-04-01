const userResolvers = require("./user");
const serviceResolvers = require("./service");
const categoryResolvers = require("./category");
const employeeResolvers = require("./employee");
const appointmentResolvers = require("./appointment");
const inquiryResolvers = require("./inquiry");
const homeCMSResolvers = require("./homeCms");
const showcaseCMSResolvers = require("./showcaseCms");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...serviceResolvers.Query,
    ...categoryResolvers.Query,
    ...employeeResolvers.Query,
    ...appointmentResolvers.Query,
    ...inquiryResolvers.Query,
    ...homeCMSResolvers.Query,
    ...showcaseCMSResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...employeeResolvers.Mutation,
    ...appointmentResolvers.Mutation,
    ...inquiryResolvers.Mutation,
    ...homeCMSResolvers.Mutation,
    ...showcaseCMSResolvers.Mutation
  }
};
