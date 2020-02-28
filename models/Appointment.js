const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      autopopulate: true
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      autopopulate: true
    },
    status: String,
    isVerified: Boolean,
    slot_start: String,
    duration: Number,
    date: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema.plugin(autopopulate)
);
