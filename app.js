require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to mongo.");
  })
  .catch((err) => {
    console.log("Error connecting to mongo.", err);
  });
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("<b>Welcome to InducedApis</b>");
});
app.use("/api", require("./api/routes/users.js"));
app.use("/adding", require("./api/routes/adding.js"));
const PORT = 3002;
app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
