const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,

  InstaCoins: {
    type: Number,
    required: true,
    default: 0,
  },
  TelegramCoins: {
    type: Number,
    required: true,
    default: 0,
  },
  telegram: {
    type: Array,
    required: true,
    default: [],
  },
  instagram: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("sub4subuser", OrdersSchema);
