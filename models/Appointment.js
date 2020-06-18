const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      autopopulate: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      autopopulate: true,
    },
    status: String,
    active: Boolean,
    slot_start: String,
    duration: Number,
    date: String,
    message: String,
    note: String,
    view: Boolean,
    reschedule: {
      appointmentId: {
        type: Schema.Types.ObjectId,
      },
      new: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema.plugin(autopopulate)
);
