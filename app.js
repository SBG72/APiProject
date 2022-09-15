const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const url = "https://catfact.ninja/fact"

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const catFact = JSON.parse(data);
      const catInfo = catFact.fact;
      res.write("<h1>Here, have a cat fact!</h1>" + catInfo);
      res.send()
    })
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Running now!")
})
