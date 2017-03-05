var express = require('express')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , app = express()
    , port = process.env.PORT || 3000
    , router = express.Router()
	, mongodb = require("mongodb")
	, ObjectID = mongodb.ObjectID;
var http = require ('http');         // For serving a basic web page.
var mongoose = require ('mongoose'); // The reason for this demo.

var SchemaName = "Settings";


app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser());                      // pull information from html in POST
app.use(methodOverride());                  // simulate DELETE and PUT
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
    res.render('index.html');
});

app.use('/', router);

 // Here we find an appropriate database to connect to, defaulting to
    // localhost if we don't find one.
    var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';

    // The http server will listen to an appropriate port, or default to
    // port 5000.
    var theport = process.env.PORT || 5000;

    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });


app.post("/api/makeschema", function(req, res) {
    // define schema
    var settingsSchema = new mongoose.Schema({
      name: { type: String, trim: true },
      sensor: { type: String, trim: true },
      frequency: { type: Number, min: 0 }
    });
    // upserts
    var settings = mongoose.model('settings', settingsSchema);

});

app.post("/api/settings", function(req, res) {
    // retrieve the model 
    var settings = mongoose.model('settings');
    //get req
    console.log(req.body);
    var newRecord = new settings(req.body);
    newRecord.save(function (err) {if (err) console.log ('Error on save!')});
 });