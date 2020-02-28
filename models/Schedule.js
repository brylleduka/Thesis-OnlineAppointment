const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  day: [String],
  workStart: String,
  workLength: Number,
  breakStart: String,
  breakLength: Number
});

module.exports = mongoose.model(
  "Schedule",
  scheduleSchema.plugin(autopopulate)
);
