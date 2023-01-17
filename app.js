// Importing the required modules
const express = require("express");
const dotenv = require("dotenv");

// utils
const { generatePdf, getIPAddress } = require("./utils");

// Initializing the express app
const app = express();
// Body parser middleware
dotenv.config();

app.get("/", (req, res) => {
  res.send("Html to pdf converter Web API is running");
});
app.get("/htmlToPdf", async (req, res) => {
    res.send(`
    <form method="post"> 
        <button type="submit" >Submit</button>
    </form>`)
})
app.post("/htmlToPdf", async (req, res) => {
  let htmlData, resolution;
  try {
    htmlData = req.body.htmlData || "<h1>Html to pdf converter Web API</h1>";
    resolution = req.body.resolution || "portrait";
  } catch (err) {
    htmlData = "<h1>Html to pdf converter Web API</h1>";
    resolution = "portrait";
  }

  const pdf = await generatePdf({
    htmlData,
    resolution,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdf.length,
  });
  res.send(pdf);
});

const PORT = Number(process.env.PORT) || 3000;

const text = `************************************************************
                  Listening on port: ${PORT}
                  http://localhost:${PORT}
                  http://${getIPAddress()}:${PORT}
************************************************************`;

app.listen(3000, () => {
  console.log(text);
});
