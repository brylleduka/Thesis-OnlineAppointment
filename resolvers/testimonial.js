const Testimonial = require("../models/Testimonial");
const Auth = require("../utils/check-auth");
const {
  UserInputError,
  ApolloError,
  ForbiddenError,
} = require("apollo-server-express");
const Filter = require("bad-words");

const filter = new Filter();
let profanity = [
  "gago",
  "potangina",
  "putangina",
  "potangama",
  "putangama",
  "tangina",
  "hayop",
  "mang",
  "putang",
  "kadyot",
  "hayop",
  "puke",
  "titi",
  "tite",
  "deputa",
  "rape",
  "kantot",
  "kantutan",
  "fuckyou",
  "tits",
  "boobs",
  "pussy",
];

filter.addWords(...profanity);

module.exports = {
  Query: {
    testimonials: async (_, { active }) => {
      try {
        const getTestimonials = await Testimonial.find({ active }).sort({
          createdAt: -1,
        });

        return getTestimonials;
      } catch (err) {
        throw err;
      }
    },
    testimonial: async (_, { _id }) => {
      try {
        const getTestimonial = await Testimonial.findById(_id);

        return getTestimonial;
      } catch (err) {
        throw err;
      }
    },
    testimonialsView: async (_, { limit }) => {
      try {
        const getViewTestimonial = await Testimonial.find({
          $and: [{ view: true }, { active: true }],
        }).limit(limit ? limit : 0);

        return getViewTestimonial;
      } catch (err) {
        throw err;
      }
    },
    userTestimonial: async (_, { userId }) => {
      try {
        const userReview = await Testimonial.findOne({ user: userId });

        return userReview;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addTestimonial: async (
      _,
      { inputTestimonial: { rating, message } },
      context
    ) => {
      let errors = {};
      try {
        const { userId: user } = Auth(context);

        const reviewCheck = await Testimonial.findOne({ user });

        if (reviewCheck) {
          errors.exist = "You already have an a review";
          throw new UserInputError("Exist", { errors });
        } else {
          const review = new Testimonial({
            rating,
            view: false,
            active: true,
            message: filter.clean(message),
            user,
          });

          const result = review.save();

          return result;
        }
      } catch (err) {
        errors.errorApollo = "Something went wrong";
        throw new ApolloError("Apollo Error", { errors });
      }
    },
    updateTestimonial: async (_, { _id, rating, message }) => {
      let errors = {};

      try {
        const updateReview = await Testimonial.findOneAndUpdate(
          { _id },
          { $set: { rating, message: filter.clean(message) } },
          { new: true }
        );

        return updateReview;
      } catch (err) {
        errors.errorApollo = "Something went wrong";
        throw new ApolloError("Apollo Error", { errors });
      }
    },
    toggleTestimonial: async (_, { _id }) => {
      let errors = {};

      try {
        const testify = await Testimonial.findById(_id);

        const reviewUpdate = await Testimonial.findOneAndUpdate(
          { _id },
          { $set: { view: !testify.view } },
          { new: true }
        );

        return reviewUpdate;
      } catch (err) {
        errors.errorApollo = "Something went wrong";
        throw new ApolloError("Apollo Error", { errors });
      }
    },
    archiveTestimonial: async (_, { _id }, context) => {
      errors = {};
      const { role: authRole, level: authLevel } = Auth(context);
      try {
        if (authRole !== "ADMIN") {
          errors.unauth = "You are not authorized to make this action";
          throw new UserInputError("Not Authorized", { errors });
        }

        await Testimonial.findOneAndUpdate(
          { _id },
          { $set: { view: false, active: false } },
          { new: true }
        );
        return true;
      } catch (err) {
        throw err;
      }
    },
    deleteTestimonial: async (_, { _id }, context) => {
      errors = {};
      const { role: authRole } = Auth(context);
      try {
        if (authRole !== "ADMIN") {
          errors.unauth = "You are not authorized to make this action";
          throw new ForbiddenError("Not Authorized", { errors });
        }

        await Testimonial.findOneAndDelete({ _id });
        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};
