const router = require("express").Router();

// 404 page
router.get("/404", async (req, res) => {
    res
      .status(404)
      .render("status", {
        spam: "404",
        description: "The page you are looking for was not found.",
      });
    // res.status(404).render("404Error")
  });