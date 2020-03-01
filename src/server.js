require('dotenv').config();
const express = require("express");
const app = express();

const cors = require('cors');

const weather = require('./controller/weather')

const PORT = process.env.SERVER_PORT;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} Visit http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hey there!");
});

app.get("/weather", async (req, res) => {
  const response = await weather(req, res);
  res.status(200).json(response);
});