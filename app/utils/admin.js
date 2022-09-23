const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.jwt;
const users = require("../models/users");

module.exports.verifyAdminLogin = async (email) => {
  try {
    const admin = await users.findOne({ email }).lean();
    if (!admin) {
      return { status: "error", error: "admin not found" };
    }
    // creating a token
    token = jwt.sign(
      { id: admin._id, username: admin.email, type: "admin" },
      JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 7 }
    );
    return { status: "ok", data: token };
  } catch (error) {
    return { status: "error", error: "timed out" };
  }
};

module.exports.verifyAdminMiddleware = async (req, res, next) => {
  try {
    console.log("query is ", req.originalUrl);
    if (req.originalUrl === "/login") {
      return next();
    }
    if (req.cookies.token) {
      const verify = jwt.verify(req.cookies.token, JWT_SECRET);
      if (verify.type === "admin") {
        return next();
      }
    }
    return res.redirect("/login");
  } catch (error) {
    return res.redirect("/login");
  }
};
