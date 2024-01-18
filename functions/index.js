/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions')

const express = require('express');
const cors = require('cors')
const app = express();
const port = 3001;
const bodyParser = require('body-parser')
const fs = require('fs')
const weather = fs.readFileSync('../functions/routes/utils/weather_by_province.json');
const weatherData = JSON.parse(weather);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post("/renewable/",  cors(corsOptions), async (req, res) => {
  try{
    const { id } = req.body;
    const weather = getWeather(id)
    console.log(weather)
    const solar_hours_per_day = weather.solar_hours_per_day
    const wind_strength = weather.wind_strength
    const rain_power = weather.rain_power
    const high_list = []
    const moderate_list = []
    const low_list = []

    if (solar_hours_per_day >= 6) {
      high_list.push("Panel Surya")
    }
    else if (solar_hours_per_day >= 4) {
      moderate_list.push("Panel Surya")
    }
    else low_list.push("Panel Surya")
    

    if (wind_strength >= 6) {
      high_list.push("Turbin Angin")
    }
    else if (wind_strength >= 3) {
      moderate_list.push("Turbin Angin")
    }
    else low_list.push("Turbin Angin")

    if (rain_power == "High") {
      high_list.push("Hydroelectric")
    }
    else if (rain_power == "Moderate") {
      moderate_list.push("Hydroelectric")
    }
    else low_list.push("Hydroelectric")

    const renewables = {high_list, moderate_list, low_list}

    result = {solarHours : solar_hours_per_day, windStrength : wind_strength, rainPower : rain_power, renewable_sources: renewables}
    res.json(result);
  }
  catch (error) {
    res.status(400).json({ error: "Bad Request" });
    console.log(error)
  }
});

// function handleSolarHours(high_list, moderate_list, low) {
//   if (solar_hours_per_day > 6) {
//     high_list.push(weather.name)
//   }
//   else if 
// }


function getWeather(id) {
  try{
    return weatherData.find(province => province.id === id);
  
  }
  catch (error) {
    res.status(400).json({ error: "Bad Request" });
    console.log(error)
  }
  
}



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const calculatorRoute = require('./routes/calculator')
app.use('/calculate', calculatorRoute);

exports.api = functions.https.onRequest(app);