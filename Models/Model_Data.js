//init data schema
    var SchemaOject = new mongoose.Schema({
    "sensorname": {
      "type": "string",
      "trim": true
    },
    "sensorunits": {
      "type": "string",
      "trim": true
    },
    "DateTime": {
      "type": "Date"
    },
    "value": {
      "type": "Number",
      "min": 0
    }
  });
  var Model_Data = mongoose.model('Data', SchemaOject);

  module.exports = Model_Data;