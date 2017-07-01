var mongoose = require('mongoose');
var router = require('express').Router();
var request = require('request');

console.log('settings loaded');

router.get("/settings", function(req, res) {
	console.log("get settings"); 

});
module.exports = router;