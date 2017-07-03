// contents of utils.js
var TempConvert = require('temp-units-conv');
var request = require('request');
var index = require('./index.js');
module.exports = {
  getweather: function() {
  	var apikey = process.env.openweatherkey;
  	var cityid = "2925533";
  	var endpoint = "http://api.openweathermap.org";
  	var path = "/data/2.5/forecast?id=" + cityid + "&APPID=" + apikey;
	var options = {
	    hostname: endpoint,
	    path: path,
	    method: 'GET',
	    json:true
	}
request(options, function(error, response, body){
    if(error){
    	console.log(error);
    } 
    else {
		console.log("Start Parsing Data");
		var parsedjson = JSON.parse(body);
		console.log(parsedjson.list[0]);
	    var currentweather = parsedjson.list[0];
	    var SensorObject = {
	    	sensorname: "Current Temperature", 
	    	sensorunits: "Celcius", 
	    	value: TempConvert.k2c(currentweather.main.temp), 
	    	DateTime: currentweather.dt};
	    console.log("Parse Finish");
		index.PostToMongoDB(SensorObject);
    }
});
  }
}
