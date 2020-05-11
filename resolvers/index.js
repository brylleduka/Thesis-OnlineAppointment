const userResolvers = require("./user");
const serviceResolvers = require("./service");
const categoryResolvers = require("./category");
const employeeResolvers = require("./employee");
const appointmentResolvers = require("./appointment");
const inquiryResolvers = require("./inquiry");
const homeCMSResolvers = require("./homeCms");
const showcaseCMSResolvers = require("./showcaseCms");
const aboutCMSResolvers = require("./aboutCms");
const testimonialResolvers = require("./testimonial");
const galleryResolvers = require("./gallery");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...serviceResolvers.Query,
    ...categoryResolvers.Query,
    ...employeeResolvers.Query,
    ...appointmentResolvers.Query,
    ...inquiryResolvers.Query,
    ...homeCMSResolvers.Query,
    ...showcaseCMSResolvers.Query,
    ...aboutCMSResolvers.Query,
    ...testimonialResolvers.Query,
    ...galleryResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...employeeResolvers.Mutation,
    ...appointmentResolvers.Mutation,
    ...inquiryResolvers.Mutation,
    ...homeCMSResolvers.Mutation,
    ...showcaseCMSResolvers.Mutation,
    ...aboutCMSResolvers.Mutation,
    ...testimonialResolvers.Mutation,
    ...galleryResolvers.Mutation,
  },
};
