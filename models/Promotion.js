const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const promotionSchema = new Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    photo: String,
    imageURL: String,
    bgColor: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promotion", promotionSchema);
