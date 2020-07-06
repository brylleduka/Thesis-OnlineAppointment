const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const walkinAppointmentSchema = new Schema(
  {
    walkinClient: {
      type: Schema.Types.ObjectId,
      ref: "WalkinClient",
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
    note: String,
    view: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WalkinAppointment",
  walkinAppointmentSchema.plugin(autopopulate)
);
