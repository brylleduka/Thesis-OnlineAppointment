const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const homeCMS = new Schema(
  {
    title: String,
    subtitle: String,
    paragraph: String,
    bgImg: String,
    bgColor: String,
    position: String,
    dark: Boolean,
    grid: Number,
    alt: Boolean,
    sectionName: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeCMS", homeCMS);
