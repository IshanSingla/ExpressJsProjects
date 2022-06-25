const axios = require("axios");
const mongoose = require("mongoose");

const services = require("../Schema/services.js");
const orders = require("../Schema/orders.js");
const User = require("../Schema/user.js");

exports.adminadd = async (req, res) => {
  const { link, key } = req.body;
  axios.get(`${link}?key=${key}&action=services`).then((response) => {
    for (x of response.data) {
      add(x, link, key);
      return res.status(200).send({ mss: "Done" });
    }
  });
};
async function add(x, link, key) {
  const user = await new services({
    _id: new mongoose.Types.ObjectId(),
    type: x.category,
    serviceid: x.service,
    servicename: x.name,
    price: x.rate,
    min: x.min,
    max: x.max,
    description: x.name,
    link,
    key,
  }).save();

  console.log(user);
}