var mongoose = require('mongoose'),
	router = require('express').Router(),
	request = require('request'),
    Model_Settings = require("../Models/Model_Settings.js"),
    Model_Data = require("../Models/Model_Data.js");
    index = require("../controller/index.js");

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
            //console.log(doc); 
            //res.render('Raw', { title: 'Heres your JSON Response', message: doc});
            res.status(200).json(doc);
        });

});

router.post("/settings", function(req, res) {
    // retrieve the model 
    var settings = mongoose.model('settings');
    //get req
    //console.log(req.body);
    var newRecord = new settings(req.body);
    newRecord.save(function(err) {
        if (err) console.log('Error on save!');
        res.render('Raw', { title: 'Heres your JSON Response', message: newRecord});
        //res.send(newRecord);
    });
});

router.get("/data", function(req, res) {
    console.log(req.get('token'));
    consoel.log(process.env.APITOKEN);
    var filtervalue = "";
    if(req.body !== 'undefined' ){
        //filtervalue = req.body; 
        console.log(req.query);
        filtervalue = req.query;
    }

    // retrieve the model 
    //get req
     var query = Model_Data.find(filtervalue, function(err, doc) {
            if (err) throw err;
            console.log('doc');
            console.log(doc); 
            //res.render('Raw', { title: 'Heres your JSON Response', message: doc});
            res.status(200).json(doc);
        });

});

/*POST Sensor Data*/ 
router.post("/data", function(req, res) {
    //console.log(req);
    index.PostToMongoDB(req.body,res);
});

router.get("/chartdata", function(req, res) {
    var filtervalue = "";
    if(req.query !== 'undefined' ){
        //filtervalue = req.body; 
        console.log(req.query);
        filtervalue = req.query;
    }

    // retrieve the model 
    //get req
     var query = Model_Data.find(filtervalue, function(err, doc) {
            if (err) throw err;
            console.log('doc');
            console.log(doc); 
            //res.render('Raw', { title: 'Heres your JSON Response', message: doc});
            var parseddata = parsemongodata(doc);
            res.status(200).json(parseddata);
        });

});

function parsemongodata(doc){
    console.log(doc.length);
    var data= {};
    for (i = 0; i<doc.length;i++) {
        var sensor = doc[i].sensorname;
        if (data[sensor]){
            data[sensor] = data[sensor] + doc[i].value;
        } else {
            data[sensor] = doc[i].value;
        }
    }
    console.log(data);
    return data;
}
module.exports = router;