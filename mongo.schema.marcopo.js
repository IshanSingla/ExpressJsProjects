const mongoose = require("mongoose");

const mechlanSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rollno: {
    type: Number,
    required: true,
    default: 0,
  },
  foodtime: {
    type: Number,
    required: true,
    default: 0,
  },
  time: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("marcopo", mechlanSchema);
