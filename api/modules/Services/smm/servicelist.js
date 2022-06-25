const services = require("../Schema/services.js");

exports.serviceslist = async (req, res) => {
    return res.status(200).send(await services.find({}).exec());
  };