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

exports.serviceslist = async (req, res) => {
  return res.status(200).send(await services.find({}).exec());
};

exports.addorder = async (req, res) => {
  const { id, url, quantity, uid } = req.body;

  const useddetails = await User.findOne({ _id: uid }).exec();
  const Services = await services.findOne({ serviceid: id }).exec();

  const payment = Number((Number(Services.price) * Number(quantity)) / 1000);

  if (useddetails.ballence - payment >= 0) {
    const response = await axios.get(
      `${Services.link}?key=${Services.key}&service=${Services.serviceid}&link=${url}&quantity=${quantity}&action=add`
    );
    if (response.data.error) {
      return res.send({
        response: { error: "Error in Smm Contact Owner" },
      });
    } else {
      const orderdetails = await new orders({
        _id: new mongoose.Types.ObjectId(),
        user: useddetails._id,
        service: Services._id,
        type: Services.type,
        OrderId: response.data.order,
        price: payment,
        quantity: quantity,
      }).save();
      const is = await User.findOneAndUpdate(
        { _id: useddetails._id },
        {
          ballence: useddetails.ballence - payment,
          $push: {
            orders: orderdetails._id,
          },
        },
        { upsert: true }
      );
      console.log(is);
      return res.send({ response: response.data });
    }
  } else {
    return res.send({
      response: {
        error: "Not enough funds on balance",
        ballence: useddetails.ballence,
        payment: payment,
      },
    });
  }
};
