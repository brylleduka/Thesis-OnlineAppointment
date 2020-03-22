const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cmsAbout = new Schema({
  title: String,
  subtitle: String,
  bgimage: String,
  mission: {
    title: String,
    subtitle: String,
    paragraph: String,
    photo: [
      {
        type: String
      }
    ]
  },
  story: {
    title: String,
    subtitle: String,
    paragraph: String,
    photo: [
      {
        type: String
      }
    ]
  }
});

module.exports = mongoose.model("CMSAbout", cmsAbout);
