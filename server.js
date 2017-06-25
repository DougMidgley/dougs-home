var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    app = express(),
    port = process.env.PORT || 3000,
    router = express.Router(),
    http = require('http'),
    mongoose = require('mongoose'),
    path = require("path"),
    Model_Settings = require("./Models/Model_Settings.js"),
    Model_Data = require("./Models/Model_Data.js");

var SchemaName = "Settings";

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // pull information from html in POST
app.use(methodOverride()); // simulate DELETE and PUT
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
    res.render('index.html');
});


router.get('/graph',function(req,res){
  res.sendfile(__dirname + '/views/graph.html');
  //It will find and locate index.html from View or Scripts
});


router.get('/jade', function(req, res, next) {
    console.log('pre-render');
    res.render('Raw', { title: 'OWKIN', scriptvariable: 'scriptvalue' });
});



app.use('/', router);




// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.

// getting-started.js
var uristring = process.env.MONGODB_URI;


// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
// we're connected!
*/




/*
app.post("/api/makeschema", function(req, res) {
    // define schema
    //var SchemaDefintion = new mongoose.Schema(req.body.schema);
    // upserts
    //console.log(SchemaDefintion);
    var SchemaJs
    var SchemaOject = new mongoose.Schema(req.body.schema);
    //SchemaOject.add(SchemaDefintion);
    var ModelObject = mongoose.model(req.body.name, SchemaOject);
    console.log(ModelObject);
    res.status(200).json(ModelObject);

});*/



app.post("/api/settings", function(req, res) {
    // retrieve the model 
    var settings = mongoose.model('settings');

    //get req
    console.log(req.body);
    var newRecord = new settings(req.body);
    newRecord.save(function(err) {
        if (err) console.log('Error on save!');
        res.render('Raw', { title: 'Heres your JSON Response', message: newRecord});
        //res.send(newRecord);
    });
});

app.get("/api/settings", function(req, res) {
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
app.get("/api/data", function(req, res) {
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

app.get("/api/chartdata", function(req, res) {
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


/*POST Sensor Data*/ 
app.post("/api/data", function(req, res) {
    var newRecord = new Model_Data(req.body);
    console.log(newRecord);
    newRecord.save(function(err) {
        if (err) console.log('Error on save!');
        res.status(200).json(newRecord)
    });
});

app.listen(port);

console.log("Running at Port " + port );