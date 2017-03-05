var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    app = express(),
    port = process.env.PORT || 3000,
    router = express.Router(),
    http = require('http'),
    mongoose = require('mongoose');

var SchemaName = "Settings";


app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // pull information from html in POST
app.use(methodOverride()); // simulate DELETE and PUT
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
    res.render('index.html');
});

app.use('/', router);

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.

// getting-started.js
var uristring = process.env.MONGODB_URI;

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

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


app.post("/api/makeschema", function(req, res) {
    // define schema
    var settingsSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true
        },
        sensor: {
            type: String,
            trim: true
        },
        frequency: {
            type: Number,
            min: 0
        }
    });
    // upserts
    var settings = mongoose.model('settings', settingsSchema);
    console.log(settings);
    res.status(200).json(settings);

});

app.post("/api/settings", function(req, res) {
    // retrieve the model 
    var settings = mongoose.model('settings');
    //get req
    console.log(req.body);
    var newRecord = new settings(req.body);
    newRecord.save(function(err) {
        if (err) console.log('Error on save!')
    });
});