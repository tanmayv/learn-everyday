var mongoose = require("mongoose")

var registraionSchema = new mongoose.Schema({
  registrationId : String
 },
{
  timestamps : true
});

var RegistraionId = mongoose.model('RegistraionId', registraionSchema, "registrationcollection");

module.exports = RegistraionId;