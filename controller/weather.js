// contents of utils.js
var TempConvert = require('temp-units-conv');
var request = require('request');
module.exports = {
  getweather: function() {
  	var apikey = process.env.openweatherkey;
  	var cityid = "2925533";
  	request
  	.get("http://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&APPID=" + apikey)
	.on('data', function(data) {
		console.log('success', data);
		    var currentweather = data.list[0];
		    var SensorObject = {
		    	sensorname: "Current Temperature", 
		    	sensorunits: "Celcius", 
		    	value: TempConvert.k2c(currentweather.main.temp), 
		    	DateTime: currentweather.dt};
		    console.log(SensorObject);
			return SensorObject;
	  })
	.on('error', function(err) {
    console.log(err)
  })
	
  }
}
