const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.jwt;
const User = require("../models/users");

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    if (verify.type === "user" || verify.type === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(JSON.stringify(error), "error");
    return false;
  }
};

// user login function
module.exports.verifyUserLogin = async (email) => {
  try {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return { status: "error", error: "user not found" };
    }

    // creating a JWT token
    token = jwt.sign(
      { id: user._id, username: user.email, type: "user" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    return { status: "ok", data: token };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.originalUrl === "/login/callback" || req.originalUrl === "/login") {
    return next();
  }

  const { token } = req.cookies;

  if (verifyToken(token)) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
