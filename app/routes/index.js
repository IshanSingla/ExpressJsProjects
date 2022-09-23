const router = require("express").Router();
const { verifyAdminMiddleware, verifyAdminLogin } = require("../utils/admin");
const { isLoggedIn } = require("../utils/auth");
// const mongoose = require("mongoose");
// const Links = require("../models/events.schema");

router.get("/", async (req, res) => {
  // const links = await Links.find();
  let ish = [
    {
      Name: "test",
      Cost: 100,
    },
    {
      Name: "testdd",
      Cost: 100,
    },
    {
      Name: "testdsa",
      Cost: 100,
    },
    {
      Name: "testdsa",
      Cost: 100,
    },
    {
      Name: "testdsa",
      Cost: 100,
    },


    {
      Name: "testdsa",
      Cost: 100,
    },
  ];
  res.status(200).render("home", {
    data: require("../utils")(ish),
  });
});

router.use("/login", require("./login"));


// router.use("/admin", verifyAdminMiddleware, require("./admin"));
// router.use("/order", isLoggedIn, require("./order"));
// router.use("/admin", require("./admin"));
// router.use("/error", require("./error"));
module.exports = router;