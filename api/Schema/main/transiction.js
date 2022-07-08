const mongoose = require("mongoose");

const TransictionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  ammount: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentmethod: {
    type: String,
    required: true,
    default: "",
  },
  transictionid: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("transiction", TransictionSchema);
