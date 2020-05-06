const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    name: String,
    photos: [
      {
        title: String,
        content: String,
        image: String,
      },
    ],
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
