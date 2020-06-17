const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    pseudoUserId: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: Number,
    email: {
      type: String,
      required: true,
    },
    dateOfBirth: Date,
    address: String,
    photo: String,
    imageURL: String,
    password: {
      type: String,
      required: true,
    },
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema.plugin(autopopulate));
