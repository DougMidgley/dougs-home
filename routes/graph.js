var mongoose = require('mongoose'),
	router = require('express').Router(),
	request = require('request'),
    Model_Settings = require("../Models/Model_Settings.js"),
    Model_Data = require("../Models/Model_Data.js");

console.log('settings loaded');

{
  series: [
    {
      name: 'series-1',
      data: [
        {x: new Date(143134652600), y: 53},
        {x: new Date(143234652600), y: 40},
        {x: new Date(143340052600), y: 45},
        {x: new Date(143366652600), y: 40},
        {x: new Date(143410652600), y: 20},
        {x: new Date(143508652600), y: 32},
        {x: new Date(143569652600), y: 18},
        {x: new Date(143579652600), y: 11}
      ]
    }
  ]
}

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
            res.status(200).json(parseddata);
        });

});

function parsefortimeseries(doc){
    console.log(doc.length);
    var data= {series: []};
    var body= data.series;
    var allsensors = doc.map(function(a) {return a.sensorname;});
    console.log(allsensors);
    var uniquesensors = allsensors.filter((x, i, a) => a.indexOf(x) == i);
    console.log(uniquesensors);

    for (i = 0; i<uniquesensors.length;i++){
        body.name = uniquesensors[i];
        var filteredObjects = doc.filter(function(d){
            return d.sensorname == "temp" && d.DateTime != null;
        })
        console.log(filteredObjects);
        for (ii = 0; ii<filteredObjects.length;i++){
            body.data.push({x: new Date(143134652600 + i), y: i});
        }
        
    }
    return data;
}

module.exports = router;