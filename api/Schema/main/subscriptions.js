const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  servicename: String,
  price: Number,
  subscription: { 
    type: Date, 
    required: true, 
    default: new Date()
},
});

module.exports = mongoose.model("subscribtions", OrdersSchema);
