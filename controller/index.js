var mongoose = require('mongoose'),
    Model_Data = require("../Models/Model_Data.js");
module.exports = {
  PostToMongoDB: function(JSONObject,response) {
    var newRecord = new Model_Data(JSONObject);
    console.log(newRecord);
    newRecord.save(function(err, res){
        console.log("res",res);
        if (err){
        	console.log('Error on save!');
            response.status(500).send("Error occurred on submitting data");
        } 
        else{
        	console.log('saved');
        	response.status(200).json(JSONObject);
        }
    });
  }
}
