var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
	content : String,
	owner : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
})

var Comment = mongoose.model('Comment', commentSchema, "commentCollection")
module.exports = Comment;