const userResolvers = require("./user");
const serviceResolvers = require("./service");
const categoryResolvers = require("./category");
const employeeResolvers = require("./employee");
const appointmentResolvers = require("./appointment");
const inquiryResolvers = require("./inquiry");
const cmsResolvers = require("./cms");
const homeCMSResolvers = require("./homeCms");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...serviceResolvers.Query,
    ...categoryResolvers.Query,
    ...employeeResolvers.Query,
    ...appointmentResolvers.Query,
    ...inquiryResolvers.Query,
    ...cmsResolvers.Query,
    ...homeCMSResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...employeeResolvers.Mutation,
    ...appointmentResolvers.Mutation,
    ...inquiryResolvers.Mutation,
    ...cmsResolvers.Mutation,
    ...homeCMSResolvers.Mutation
  }
};
