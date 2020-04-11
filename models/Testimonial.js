const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const testimonialSchema = new Schema(
  {
    rating: Number,
    message: {
      type: String,
    },
    view: Boolean,
    active: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Testimonial",
  testimonialSchema.plugin(autopopulate)
);
