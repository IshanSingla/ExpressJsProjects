const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  service: mongoose.Schema.Types.ObjectId,
  type: String,
  OrderId: String,
  price: Number,
  quantity: String
});

module.exports = mongoose.model("orders", OrdersSchema);
