var cron = require('node-cron');
var weather = require('./weather.js');


module.exports = {
  runJobs: function() {
	cron.schedule('* */3 * * *', function(){
	  console.log('running a task every minute');
	  weather.getweather();

	});
	
  }
}



