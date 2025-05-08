require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");

app.use(cors());

app.get("/ping", (req, res) => {
  console.log(`Self ping received at`, new Date().toISOString());
  res.send("Pong!");
  s;
});

cron.schedule("*/5 * * * *", async () => {
  const urls = [
    process.env.ADVANCED_IT_MAIL_SERVER,
    process.env.TODAY_FOOD_MENU,
    process.env.ABDUR_ROUF_PROFILE,
  ];

  for (const url of urls) {
    try {
      const response = await axios.get(url);
      console.log(`Successfully hit ${url} - Status: ${response.status}`);
    } catch (error) {
      console.log(`Failed to hit ${url} - Status: ${error.message}`);
    }
  }
  console.log("--- Cron Job Completed ---");
});

app.listen(port, () => {
  console.log(`Server is runnit at port: ${port}`);
});
