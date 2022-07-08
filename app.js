require("dotenv").config();
const express = require("express");
const db = require("./api/config/mongoose");

const app = express();
const PORT = Number(21);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<b>Welcome to InducedApis</b>");
});
app.use("/auth", require("./api/routes/users.js"));
app.use("/adding", require("./api/routes/adding.js"));
app.use("/services", require("./api/routes/services.js"));
app.use("/sub4sub", require("./api/routes/sub4sub"));
app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
