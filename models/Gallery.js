const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    title: String,
    photos: [
      {
        name: String,
        content: String,
        image: String,
        height: Number,
        width: Number,
      },
    ],
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
