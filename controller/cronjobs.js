var cron = require('node-cron');
var weather = require('./weather.js');


module.exports = {
  runJobs: function() {
	cron.schedule('* * * * *', function(){
	  console.log('running a task every minute');
	  console.log(weather.getweather());

	});
	
  }
}



