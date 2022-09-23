const JWT_SECRET = process.env.jwt;
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    let token = req.cookies.token;
    const verify = jwt.verify(token, JWT_SECRET);

    let currUser = await User.findById(verify.id);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    let token = req.cookies.token;
    const verify = jwt.verify(token, JWT_SECRET);

    let currUser = await User.findById(verify.id);

    let { orders } = currUser;

    return res.render("order", {
      data: orders,
    });

    // res.send(user);
  } catch (e) {
    return res.redirect("back");
  }
});

module.exports = router;
