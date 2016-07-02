var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	name : {first : String, last : String},
	emailId : {type : String, required : true},
	publishedFacts : [{type : mongoose.Schema.Types.ObjectId, ref : 'Fact'}],
	favFacts : [{type : mongoose.Schema.Types.ObjectId, ref : 'Fact'}]
})

var User = mongoose.model('User', userSchema, "usercollection")

module.exports = User;