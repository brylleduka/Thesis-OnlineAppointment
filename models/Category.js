const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    photo: String,
    active: Boolean,
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        autopopulate: true,
      },
    ],
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Category",
  categorySchema.plugin(autopopulate)
);
