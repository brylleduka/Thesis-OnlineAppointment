const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = Schema({
  address: String,
  lat: Number,
  lng: Number,
  mapKey: String,
  phone: String,
  mobile: String,
});

module.exports = mongoose.model("Contact", contactSchema);
