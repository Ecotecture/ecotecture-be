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


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const calculatorRoute = require('./routes/calculator')
app.use('/calculate', calculatorRoute);

exports.api = functions.https.onRequest(app);