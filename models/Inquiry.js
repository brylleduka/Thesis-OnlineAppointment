const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inquirySchema = new Schema(
  {
    name: String,
    email: String,
    to: String,
    subject: String,
    message: String,
    reply: String,
    read: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
