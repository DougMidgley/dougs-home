// contents of utils.js
var TempConvert = require('temp-units-conv');
var request = require('http');
var index = require('./index.js');
module.exports = {
  getweather: function() {
  	var apikey = process.env.openweatherkey;
  	var cityid = "2925533";
  	var url = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&APPID=" + apikey;

  	request.get(url, function(res){
    res.setEncoding('utf8');
    var JSONString;
    var i = 0;
    res.on('data', function(chunk){
    	console.log("chunk " + i)
    	i++
    	JSONString = JSONString + chunk;
    });
    res.on('error', function(err) {
    console.log(err)
  });
    res.on('end', function(chunk){
    		console.log(JSONString);
    		console.log("Start Parsing Data");
    		var parsedjson = JSON.parse(JSONString);
    		console.log(parsedjson.list[0]);
		    var currentweather = parsedjson.list[0];
		    var SensorObject = {
		    	sensorname: "Current Temperature", 
		    	sensorunits: "Celcius", 
		    	value: TempConvert.k2c(currentweather.main.temp), 
		    	DateTime: currentweather.dt};
		    console.log("Parse Finish");
			index.PostToMongoDB(SensorObject);
    });

});
	
  }
}
