const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  link: String,
  key: String,
  serviceid: String,
  servicename: String,
  price: Number,
  min: Number,
  max: Number,
  description: {
    type: String,
    required: true,
    default: ""
},
});

module.exports = mongoose.model("services", ServicesSchema);
