var express = require('express');
var router = express.Router();
const {performCalculation} = require("./utils/calculate_solarpanel")
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus:200
}
router.use(cors(corsOptions));

/* GET home page. */
router.post("/",  cors(corsOptions), async (req, res) => {
  console.log('receiving data ...');
  try{
    var { solar_hours, electricity, panel_width, panel_length} = req.body;
    const parsed_solar_hours = parseFloat(solar_hours);
    const parsed_electricity = parseFloat(electricity);
    const parsed_panel_width = parseFloat(panel_width);
    const parsed_panel_length = parseFloat(panel_length);
    if (isNaN(parsed_solar_hours) || isNaN(parsed_electricity)) {
      res.status(400).json({ error: 'Invalid input provided' });
    }
    var result = performCalculation(solar_hours, electricity, panel_width, panel_length)
    res.json(result);
  }
  catch (error) {
    res.status(400).json({ error: "Bad Request" });
    console.log(error)
  }
});

router.post("/cost/",  cors(corsOptions), async (req, res) => {
  console.log('receiving data ...');
  try{
    var {monthly_cost} = req.body;
    const parsed_cost = parseFloat(monthly_cost);
    if (isNaN(parsed_solar_hours) || isNaN(parsed_electricity)) {
      res.status(400).json({ error: 'Invalid input provided' });
    }
    var annual_cost = parsed_cost * 12
    res.json(result);
  }
  catch (error) {
    res.status(400).json({ error: "Bad Request" });
    console.log(error)
  }
});

module.exports = router;
