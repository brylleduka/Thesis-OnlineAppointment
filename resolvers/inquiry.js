const Inquiry = require("../models/Inquiry");
const transportMail = require("../utils/transportMail");
const { UserInputError } = require("apollo-server-express");
const { validateInquiry } = require("../utils/validators");

module.exports = {
  Query: {
    inquiries: async () => {
      try {
        const inqs = await Inquiry.find().sort({ createdAt: -1 });
        return inqs;
      } catch (err) {
        throw err;
      }
    },
    inquiriesRead: async (_, { read }) => {
      try {
        const inqs = await Inquiry.find({ read }).sort({ createdAt: -1 });
        return inqs;
      } catch (err) {
        throw err;
      }
    },
    inquiry: async (_, { _id }) => {
      try {
        const inq = await Inquiry.findById(_id);
        return inq;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    sendInquiry: async (_, { name, email, to, subject, message }) => {
      const { errors, valid } = validateInquiry(email, subject, message);

      if (!valid) {
        throw new UserInputError("Input Error", { errors });
      }

      const newInquiry = await new Inquiry({
        name,
        email,
        to,
        subject,
        message,
        reply: "",
        read: false,
      });

      transportMail({
        from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
        to: to, // list of receivers
        subject: subject,
        text: "We will get in touch with you as soon as possible",
        temp: "inquiry", // plain text body
      });

      await newInquiry.save();

      return newInquiry;
    },
    replyInquiry: async (_, { _id, email, message }) => {
      const inquiry = await Inquiry.findById(_id);
      const subject = inquiry.subject;
      const updateInquiry = await Inquiry.findByIdAndUpdate(_id, {
        $set: { reply: message },
      });

      transportMail({
        from: '"Z Essence Facial and Spa"<zessence.spa@gmail.com>',
        to: email, // list of receivers
        subject: subject,
        text: message, // plain text body
        html: message,
      });

      return updateInquiry;
    },
    readInquiry: async (_, { _id }) => {
      const readInquiry = await Inquiry.findOneAndUpdate(
        { _id },
        {
          $set: { read: true },
        },
        { new: true }
      );

      return true;
    },
  },
};
