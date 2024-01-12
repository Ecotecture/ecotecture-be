function performCalculation(solar_hours, electricity, panel_width, panel_length) {
  if (panel_width == null)  {
    panel_width = 1.0
  }
  if (panel_length == null) {
    panel_length = 1.7
  }
  var solar_array = getSolarArray(solar_hours, electricity)

  

  var num_panels = getNumPanels(solar_array)
 

  var area_occupied = getAreaOcuppied(num_panels, panel_width, panel_length)

  // TODO: tambah installation cost, 
  return { solarArray: solar_array, numPanels: num_panels, areaOcuppied: area_occupied };
    
  }

function getSolarArray(solar_hours, electricity)  {
  // IN KWH
// solar array output = electricity consumption / (365 × solar hours in a day)
  var array_output = electricity / (365 * solar_hours)
  var bill_offset = 0.08
  var env_factor = 0.85
  // solar array size = solar array output × (bill offset / environmental factor)
  var array_size = array_output * (bill_offset / env_factor)*10
  array_size = array_size.toFixed(2)
  return array_size
}  
  
function getNumPanels(solar_array){
  // IN METER, assume each panel results in 300 watt
  // required panels = solar array size in kW × 1000 / panel output in watts
  var panel_outputs = 300 
  var num_panels = solar_array * 1000 / panel_outputs
  num_panels = num_panels.toFixed(0)
  return num_panels
}

function getAreaOcuppied(num_panels, panel_width, panel_length)  {
  // IN METER
   // area occupied = required panels × panel width × panel length
  var area_occupied = num_panels * panel_width * panel_length
  area_occupied = area_occupied.toFixed(2)
  return area_occupied
}


module.exports = { performCalculation };