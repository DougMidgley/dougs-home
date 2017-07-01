var mongoose = require('mongoose');
var router = require('express').Router();
var request = require('request');

console.log('weather loaded');

router.get("/weather", function(req, res) {
	console.log("weather"); 

});
module.exports = router;