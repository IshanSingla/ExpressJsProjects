
const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    default: "user",
  },
  orders: {
    type: Array,
    required: true,
    default: [],
    ref: "Orders",
  }
});

module.exports = mongoose.model("users", ServicesSchema);