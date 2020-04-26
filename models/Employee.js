const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    empId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: String,
    email: {
      type: String,
      required: true,
    },
    photo: String,
    bio: String,
    dateOfBirth: Date,
    certificates: [
      {
        title: String,
        description: String,
        photo: String,
      },
    ],
    role: String,
    level: Number,
    active: Boolean,
    password: {
      type: String,
      required: true,
    },
    categoryServices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        autopopulate: true,
      },
    ],
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Employee",
  employeeSchema.plugin(autopopulate)
);
