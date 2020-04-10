const Testimonial = require("../models/Testimonial");
const Auth = require("../utils/check-auth");
const { UserInputError, ApolloError } = require("apollo-server-express");
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
    testimonials: async () => {
      try {
        const getTestimonials = await Testimonial.find().sort({
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
        const getViewTestimonial = await Testimonial.find({ view: true }).limit(
          limit ? limit : 0
        );

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
  },
};
