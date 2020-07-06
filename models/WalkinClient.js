const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const walkinClientSchema = new Schema(
  {
    pseudoId: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: String,
    email: {
      type: String,
    },
    dateOfBirth: Date,
    address: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WalkinClient",
  walkinClientSchema.plugin(autopopulate)
);
