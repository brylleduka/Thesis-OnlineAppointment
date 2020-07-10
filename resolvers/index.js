const userResolvers = require("./user");
const serviceResolvers = require("./service");
const categoryResolvers = require("./category");
const employeeResolvers = require("./employee");
const appointmentResolvers = require("./appointment");
const walkinAppointmentResolvers = require("./walkinAppointment");
const inquiryResolvers = require("./inquiry");
const homeCMSResolvers = require("./homeCms");
const showcaseCMSResolvers = require("./showcaseCms");
const aboutCMSResolvers = require("./aboutCms");
const testimonialResolvers = require("./testimonial");
const galleryResolvers = require("./gallery");
const contactResolvers = require("./contact");
const brandResolvers = require("./brand");
const promotionResolvers = require("./promotion");

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
    ...contactResolvers.Query,
    ...brandResolvers.Query,
    ...walkinAppointmentResolvers.Query,
    ...promotionResolvers.Query,
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
    ...contactResolvers.Mutation,
    ...brandResolvers.Mutation,
    ...walkinAppointmentResolvers.Mutation,
    ...promotionResolvers.Mutation,
  },
};
