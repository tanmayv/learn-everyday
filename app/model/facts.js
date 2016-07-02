var mongoose = require("mongoose")

var factSchema = new mongoose.Schema({
	title : String,
	author : {name : String, _id : {type: mongoose.Schema.Types.ObjectId, ref : 'User'}},
	bannerUrl : String,
	content : String,
	hidden : {type : Boolean , default : false},
	date : {type : Date, default : Date.now},
	comments : [{type: mongoose.Schema.Types.ObjectId, ref : 'Comment'}],
	meta : {
		favs : {type : Number, default : 0}
	}
},
{
	timestamps : true
})
// Return facts between two timestamps	
// {
// 	timestampTo,timestampFrom,limit
// }
factSchema.statics.findBetweenTimestamps = function(input,callback){
	if(!input.timestampFrom){
		input.timestampFrom = new Date()
	}
	if(!input.limit){
		input.limit = 5
	}
	if(input.timestampTo){
		this.find($and[{updatedAt : {$lte : input.timestampFrom}},{updatedAt : {$gte : input.timestampTo}}]).limit(input.limit).sort({"updatedAt": -1}).exec(callback);
	}
	else
		this.find({updatedAt : {$lte : input.timestampFrom}}).limit(input.limit).sort({"updatedAt": -1}).exec(callback)
}

var Fact = mongoose.model('Fact', factSchema, "factcollection");

module.exports = Fact;