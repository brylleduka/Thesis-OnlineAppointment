const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cmsSchema = new Schema({
  fileName: String,
  section: String,
  headline: String,
  paragraph: String,
  colorScheme: String,
  fontSize: String,
  bgcolorScheme: String
});

module.exports = mongoose.model("CMS", cmsSchema);
