const mongoose = require("mongoose");

const exchangeSchema = mongoose.Schema({
  abbreviation: { type: String, required: true }, //abbreviation
  languages: { type: Array, required: true },
  serialNumber: { type: Number, required: true }, //number
  decimals: { type: Number, required: true },
});

module.exports = mongoose.model("Exchange", exchangeSchema);
