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

router.get('/graph', function(req, res, next) {
  res.render('graph.html');
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


//always set sc

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

//


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
    console.log(settingsSchema);
    var settings = new Schema;
    settings.add(settingsSchema);
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
        if (err) console.log('Error on save!');
        res.render('Raw', { title: 'Heres your JSON Response', message: newRecord});
        //res.send(newRecord);
    });
});

app.get("/api/settings", function(req, res) {
    // retrieve the model 
    var settings = mongoose.model('settings');
    //get req
     var query = settings.find({ name: 'lux esp'}, function(err, doc) {
            if (err) throw err;
            console.log('doc');
            console.log(doc); 
            res.render('Raw', { title: 'Heres your JSON Response', message: doc});
            //res.status(200).json(doc);
        });

});