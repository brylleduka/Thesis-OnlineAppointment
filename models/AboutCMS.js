const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const aboutCMS = Schema(
  {
    title: String,
    subtitle: String,
    paragraph: String,
    dark: Boolean,
    overlay: Boolean,
    bgImg: String,
    bgColor: String,
    story: {
      title: String,
      subtitle: String,
      paragraph: String,
      photo: String,
      alt: Boolean,
    },
    missionvision: {
      photo: String,
      alt: Boolean,
      mission: {
        title: String,
        subtitle: String,
        paragraph: String,
      },
      vision: {
        title: String,
        subtitle: String,
        paragraph: String,
      },
    },
    contentName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AboutCMS", aboutCMS);