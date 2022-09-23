const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require("passport");
const router = require("express").Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/callback",
      // passReqToCallback: true
    },
    function (accessToken, refreshToken, profile, done) {
      if (profile._json.hd === "chitkara.edu.in") {
        // find or create user in database, etc
        return done(null, profile);
      } else {
        // fail
        return done(new Error("Invalid host domain"));
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/");
  }
);
module.exports = router;
