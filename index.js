const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const { connectDatabase } = require("./app/config/db");

const app = express();

// webapp setups
app
  .set("view engine", "ejs")
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .set("views", path.join(__dirname, "views"))
  .set("public", path.join(__dirname, "public"))
  .use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "SECRET",
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use("/", require("./app/routes")) // ALL Events page
  .use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  })
  .use(function (err, req, res, next) { // error handler
    res.status(err.status || 500);
    res.render("error", { error: {
      status: err.status,
      Description: err,
    } });
  });

// // heroku awake way
// setInterval(() => {
//   http.get("http://ieeewebapp.herokuapp.com");
// }, 300000); // every 5 minutes (300000)

const PORT = Number(process.env.PORT) || 4000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Listening on port: " + PORT);
    });
  })
  .catch((err) => {
    console.log("Error at Connecting Database ", err);
  });
