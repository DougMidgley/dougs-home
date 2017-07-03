var mongoose = require('mongoose'),
    Model_Data = require("../Models/Model_Data.js");
module.exports = {
  PostToMongoDB: function(JSONObject) {
    var newRecord = new Model_Data(JSONObject);
    console.log(newRecord);
    newRecord.save(function(err) {
        if (err) console.log('Error on save!');
        res.status(200).json(newRecord)
    });
  }
}
