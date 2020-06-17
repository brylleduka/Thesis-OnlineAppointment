const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    image: String,
    imageURL: String,
    active: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
