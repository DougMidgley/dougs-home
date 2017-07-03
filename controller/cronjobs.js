var cron = require('node-cron');


module.exports = {
  runJobs: function() {
	cron.schedule('* * * * *', function(){
	  console.log('running a task every minute');
	  console.log(getweather());

	});
	
  }
}



