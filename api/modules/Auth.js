const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../Schema/user.js");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(422).json({ msg: "name Required" });
  }
  if (!email) {
    return res.status(422).json({ msg: "email Required" });
  }
  if (!password) {
    return res.status(422).json({ msg: "password Required" });
  }
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(409).send({
        message: "Email is already in use.",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await new User({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      name: name,
      password: passwordHash,
    }).save();

    const verificationToken = user.generateVerificationToken();

    const url = `http://localhost:3000/api/verify/${verificationToken}`;

    return res.status(201).send({
      message: `Sent a verification email to ${email}`,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "email Required" });
  }
  if (!password) {
    return res.status(422).json({ msg: "password Required" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ msg: "Email Not Found" });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Password Invalid" });
  }
  if (!user.verified) {
    return res.status(422).json({ msg: "Account not verified" });
  }
  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Login Sucessfully", token });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

exports.verify = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(422).send({
      message: "Missing Token",
    });
  }
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET);
  } catch (err) {
    return res.status(500).send(err);
  }
  try {
    const user = await User.findOne({ _id: payload.ID }).exec();
    if (!user) {
      return res.status(404).send({
        message: "User does not  exists",
      });
    }
    user.verified = true;
    await user.save();
    return res.status(200).send({
      message: "Account Verified",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};


// app.get("/user/:id", checkToken, async (req, res) => {
//   const id = req.params.id;

//   ////  CHECK IF USER EXISTS  ///
//   const user = await User.findById(id, "-password");

//   if (!user) {
//     return res.status(404).json({ msg: "User not found" });
//   }
//   res.status(200).json({ user });
// });

// function checkToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ msn: "Access Denied" });
//   }

//   try {
//     const secret = process.env.SECRET;
//     jwt.verify(token, secret);

//     next();
//   } catch (error) {
//     res.status(400).json({ msg: "Token Invalid" });
//   }
// }
