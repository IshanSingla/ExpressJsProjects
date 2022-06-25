const mongoose = require("mongoose");

const TransictionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  ammount: Number,
  paymentmethod: String,
  transictionid: Number
});

module.exports = mongoose.model("transiction", TransictionSchema);
