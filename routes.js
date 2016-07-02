var express = require('express');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('properties.ini');
// models 
var Fact = require('./app/model/facts.js')
var User = require('./app/model/users.js')
var Comment = require('./app/model/comments.js')

var mongoose = require('mongoose');

var mongoUrl = properties.get('db.mongo.url');
console.log("Trying to connect : " + mongoUrl)
mongoose.connect(mongoUrl, function(err,db){
	if(!err)
		console.log("Connected to the Database");
	else
		console.log("Err : Cannot connect to the database")	
})
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});



router.route('/facts')
	.post(function(req,res){

		// Create a new fact with parameters in request object
		var fact = new Fact(req.body)
		
		fact.save(function(err){

			if(err){
				console.log(err)
				res.json(err)
			}else{
				res.json({message : "SUCCESS", data : fact})
			}
		})

	})
	.get(function(req,res){
		
		Fact.findBetweenTimestamps(req.body, function(err, posts){
			res.json({message:"SUCCESS", data : posts})
		})
		

	})

router.route('/facts/:factId')
	.post(function(req,res){
		var factId = req.params.factId;
		Fact.findOne({_id : factId}).exec(function(err, fact){
			if(err)
				res.json({message : "ERROR", error : err})
			else{
				if(req.body.title)
					fact.title = req.body.title;
				if(req.body.content)
					fact.content = req.body.content;
				if(req.body.author)
					fact.author = req.body.author;
				if(req.body.bannerUrl)
					fact.bannerUrl = req.body.bannerUrl;
				if(req.body.hidden)
					fact.hidden = req.body.hidden;
				if(req.body.comments)
					fact.comments = req.body.comments;
				if(req.body.meta)
					fact.meta = req.body.meta
				
				fact.save(function(err){
					if(err){
						res.json({message : "ERROR", error : err})
					}else
						res.json({message : "SUCCESS", data : fact})
				})
			}
				
		})

	})
	.get(function(req,res){
		var factId = req.params.factId;
		Fact.findOne({_id : factId}).exec(function(err, fact){
			if(err)
				res.json({message : "ERROR", error : err})
			else
				res.json({message : "SUCCESS", data : fact})
		})
	})

router.route('/users')
	.post(function(req,res){
		var user = new User(req.body)
		user.save(function(err){
			if(err)
				res.json({message : "ERROR", error : err})
			else
				res.json({message : "SUCCESS", data : user})
		})
	})

router.route('/users/:userId')
	.post(function(req,res){
		var userId = req.params.userId;

		User.findOne({_id : userId}).exec(function(err,user){
			if(req.body.name)
				user.name = req.body.name;
			if(req.body.emailId)
				user.emailId = req.body.emailId;
			if(req.body.publishedFacts)
				user.publishedFacts = req.body.publishedFacts;
			if(req.body.favFacts)
				user.favFacts = req.body.favFacts;

			user.save(function(err){
				if(err)
					res.json({message : "ERROR", error : err})
				else
					res.json({message : "SUCCESS", data : user})
			})
		})
	})
// more routes for our API will happen here

module.exports = router;