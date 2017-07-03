// contents of utils.js
var TempConvert = require('temp-units-conv');
module.exports = {
  getweather: function() {
  	var apikey = process.env.openweatherkey;
  	var cityid = "2925533";
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&APPID=" + apikey,
    method: "GET"}
    )
  .done(function(data) {
    console.log('success', data);
    var currentweather = data.list[0];
    var response = {
    	sensorname: "Current Temperature", 
    	sensorunits: "Celcius", 
    	value: TempConvert.k2c(currentweather.main.temp), 
    	DateTime: currentweather.dt};
    console.log(response);
	return response;
  
  })
  .fail(function(xhr) {
    console.log('error', xhr);
  });
	
  }
}
