const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send(fs.readFileSync('./index.html', 'utf8'));
});

app.get("/about", function (req, res) {
  res.send(fs.readFileSync('./about.html', 'utf8'));
});

app.get("/", function (req, res) {
  res.send(fs.readFileSync('./contact-me.html', 'utf8'));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});