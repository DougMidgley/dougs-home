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

router.get("/timeseries", authenticate, function(req, res) {
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
            //res.render('Raw', { title: 'Heres your JSON Response', message: doc});
            var parseddata = parsefortimeseries(doc);
            console.log(parseddata);
            res.status(200).json(parseddata);
        });

});

router.post("/timeseries", authenticate, function(req, res) {
    //req.body used filtering data
     var query = Model_Data.find(req.body, function(err, doc) {
            if (err) throw err;
            var parseddata = parsefortimeseries(doc);
            res.status(200).json(parseddata);
        });

});

function parsefortimeseries(doc){
    //console.log(doc.length);
    var data= {series: []};
    var allsensors = doc.map(function(a) {return a.sensorname;});
    var uniquesensors = allsensors.filter((x, i, a) => a.indexOf(x) == i);

    for (i = 0; i<uniquesensors.length;i++){
        var body = new Object();
        body.name = uniquesensors[i];
        var filteredObjects = doc.filter(function(d){
            //console.log(d.DateTime );
            return d.sensorname == body.name && d.DateTime !== 'undefined';
        });
        body.data = [];
        for (ii = 0; ii<filteredObjects.length;ii++){
            body.data[ii] = {x: new Date(filteredObjects[ii].DateTime).valueOf(), y: filteredObjects[ii].value};
            //console.log(body);
        }
        data.series.push(body);
        
    }
    //console.log("end of function");
    return data;
}
function authenticate( req, res, next ) {
    if (process.env.WHITELIST.split("|").includes(req.get('origin'))) {
        // calls function
        next();
    } else {
      // bypasses route1 and route2
      // errorHandler will be called with the error
      res.status(401).send('Not in whitelist ');
      return next( Error( 'Authenticate failed' ) );
    }

}

module.exports = router;