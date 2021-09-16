const express = require("express");
const app = express();

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.get('/about', function (req, res) {
  res.send('Hello There')
})
app.listen(1337, () => {
  console.log("The server is up and running on port 1337!");
});
