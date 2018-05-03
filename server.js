const express = require("express");
const path = require("path");

const PORT = 8080;

const app = express();

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
