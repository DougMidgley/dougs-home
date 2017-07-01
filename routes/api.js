var mongoose = require('mongoose'),
	router = require('express').Router(),
	request = require('request'),
    Model_Settings = require("./Models/Model_Settings.js"),
    Model_Data = require("./Models/Model_Data.js");

console.log('settings loaded');

router.get("/settings", function(req, res) {
    var filtervalue = "";
    if(req.body !== 'undefined' ){
        //filtervalue = req.body; 
        console.log(req.query);
        filtervalue = req.query;
    }

    // retrieve the model 
    //get req
     var query = Model_Settings.find(filtervalue, function(err, doc) {
            if (err) throw err;
            console.log('doc');
            console.log(doc); 
            //res.render('Raw', { title: 'Heres your JSON Response', message: doc});
            res.status(200).json(doc);
        });

});
module.exports = router;