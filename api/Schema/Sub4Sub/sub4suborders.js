const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  order: {
    type: Boolean,
    required: true,
    default: false,
  },
  type: {
    type: String,
    required: true,
    default: "instagram follow",
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  link: {
    type: String,
    required: true,
    default: "",
  },
  done: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("sub4suborders", OrdersSchema);
