
const express = require("express");
const https = require("https");
const fs = require('fs');
const bodyParser = require("body-parser");

// let temperatureDegree = document.querySelector(".temperature-degree");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  const query = "lagos";
  const apikey = "179abb09575d0ed58bf0a7140c405351";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units + ""
  https.get(url, function(response) {

    console.log(response.statusCode);

    const html = fs.readFileSync('./index.html');
    response.on("data", function(data) {

      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      let htmlFile = html.toString();

      const WeatherDescription = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      const city = weatherdata.name;
      //res.write("<p>The weather is currently" + WeatherDescription+"<p>");
      //res.write("The temperature in Lagos is" + temp + "degrees");
      var imageicon = ("<img src =" + imageURL + ">");
      //temperatureDegree.textContent = temp;

      htmlFile = htmlFile.replace("Timezone", city);
      htmlFile = htmlFile.replace("#Icon", imageicon);
      htmlFile = htmlFile.replace('#{temp}', temp);
      htmlFile = htmlFile.replace("Its soo warm", "The weather in " + query + " is currently " + WeatherDescription)
      res.send(htmlFile)
    })
  })





})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apikey = "179abb09575d0ed58bf0a7140c405351";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units + ""
  https.get(url, function(response) {

    console.log(response.statusCode);

    const html = fs.readFileSync('./index.html');
    response.on("data", function(data) {

      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      let htmlFile = html.toString();

      const WeatherDescription = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      const city = weatherdata.name;
      //res.write("<p>The weather is currently" + WeatherDescription+"<p>");
      //res.write("The temperature in Lagos is" + temp + "degrees");
      var imageicon = ("<img src =" + imageURL + ">");
      //temperatureDegree.textContent = temp;

      htmlFile = htmlFile.replace("Timezone", "City Name : " + city);
      htmlFile = htmlFile.replace("#Icon", imageicon);
      htmlFile = htmlFile.replace('#{temp}', temp);
      htmlFile = htmlFile.replace("Its soo warm", "The weather in " + query + " is currently " + WeatherDescription)
      res.send(htmlFile)
    })
  })

  console.log(req.body.cityName);
})

app.use(express.static('./'))

app.listen(3000, function() {

  console.log("server is running on port 3000");
})
