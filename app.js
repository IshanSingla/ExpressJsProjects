// Imports
const express = require("express");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const http = require("http");

// Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = Number(process.env.PORT) || 5000;

// Mongo Config
const { connectDatabase } = require("./mongo.config");

const marcopolo = require("./mongo.schema.marcopo")
const marcopo = marcopolo.watch();

marcopo.on("change", (data) => {
    if(data.operationType=="insert"){
    console.log(data.fullDocument);}});

io.on("connection", (socket) => {
  console.log(socket.handshake.headers["user-agent"]);

  socket.on("chat", (payload) => {
    console.log(payload);
    io.emit("chat", payload);
  });
});

app.get("/", async (req, res) => {
    await new marcopolo({
        _id: new mongoose.Types.ObjectId(),
        rollno: 2110990648,
        foodtime: 1,
      }).save();
  io.emit("chat", { message: "ishan", userName: "ishasingla" });
  res.status(200).send("index");
});

server.listen(PORT, async () => {
  await connectDatabase();
  console.log(`sockit running http://localhost:${PORT}`);
});
