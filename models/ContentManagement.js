const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentManagementSchema = new Schema({
  photo: String,
  section: String,
  headline: String,
  paragraph: String
});

module.exports = mongoose.model("ContentManagement", contentManagementSchema);
