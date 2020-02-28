const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const slotSchema = new Schema(
  {
    slot_start: String,
    slot_end: String,
    date: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Slot", slotSchema.plugin(autopopulate));
