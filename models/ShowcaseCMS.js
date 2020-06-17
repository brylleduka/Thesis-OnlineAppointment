const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const showcaseCMS = new Schema(
  {
    sectionName: String,
    content: [
      {
        title: String,
        subtitle: String,
        paragraph: String,
        bgImg: String,
        bgImgURL: String,
        bgColor: String,
        position: String,
        dark: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShowcaseCMS", showcaseCMS);
