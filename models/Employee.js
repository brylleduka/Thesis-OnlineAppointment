const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    empId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    contact: String,
    email: {
      type: String,
      required: true
    },
    photo: String,
    bio: String,
    role: String,
    level: Number,
    password: {
      type: String,
      required: true
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        autopopulate: true
      }
    ],
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      autopopulate: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Employee",
  employeeSchema.plugin(autopopulate)
);
