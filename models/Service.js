const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: Number,
    price: Number,
    description: String,
    photo: String,
    active: Boolean,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema.plugin(autopopulate));
