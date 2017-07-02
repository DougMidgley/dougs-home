var mongoose = require('mongoose'),
	router = require('express').Router(),
	request = require('request'),
    Model_Settings = require("../Models/Model_Settings.js"),
    Model_Data = require("../Models/Model_Data.js");

console.log('graph loaded');

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

router.get("/timeseries", function(req, res) {
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
            var parseddata = parsefortimeseries(doc);
            console.log(parseddata);
            res.status(200).json(parseddata);
        });

});

function parsefortimeseries(doc){
    console.log(doc.length);
    var data= {series: []};
    var body= data.series;
    var allsensors = doc.map(function(a) {return a.sensorname;});
    var uniquesensors = allsensors.filter((x, i, a) => a.indexOf(x) == i);

    for (i = 0; i<uniquesensors.length;i++){
        body.name = uniquesensors[i];
        var filteredObjects = doc.filter(function(d){
            return d.sensorname == "temp" && d.DateTime != null;
        })
        body.data = [];
        console.log(filteredObjects);
        for (ii = 0; ii<filteredObjects.length;i++){
            body.data[ii] = {x: new Date(143134652600 + ii), y: ii};
        }
        
    }
    console.log("end of function");
    return data;
}

module.exports = router;