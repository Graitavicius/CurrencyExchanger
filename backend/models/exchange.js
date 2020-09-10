const mongoose = require("mongoose");

const exchangeSchema = mongoose.Schema({
  value: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Exchange", exchangeSchema);
