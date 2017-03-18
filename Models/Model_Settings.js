var mongoose = require('mongoose');


//init data schema
    var SchemaOject = new mongoose.Schema({
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
  var Model_Settings = mongoose.model('Settings', SchemaOject);

  module.exports = Model_Settings;