// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var solr = require('solr-client');

// Create a client
var solrClient = solr.createClient();
solrClient.options.port = 8983
solrClient.options.path = '/solr/facts'

var router = require('./routes.js')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send({status:500, message: 'internal error', type:'internal'}); 
})
var port = process.env.PORT || 8080;        // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.get('/', function(req,res){
  if(req.query.q){
    var query = solrClient.createQuery();
      query.q(req.query.q)
      solrClient.search(query,function(err,response){
        var docs = response.response.docs;
        for(i = 0 ; i < docs.length; i++){
          if(docs[i]._id instanceof Array){
            docs._id = docs[i]._id[0];
          }
          if(docs[i].title instanceof Array){
            docs[i].title = docs[i].title[0];
          }
          if(docs[i].content instanceof Array){
            docs[i].content = docs[i].content[0];
          }
          if(docs[i].createdAt instanceof Array){
            docs[i].createdAt = docs[i].createdAt[0];
          }
        }
        res.send(docs)
      })
  }else
  res.send({"message" : "Nothing here to see"});
})
app.listen(port);


console.log("Running at port : " + port);
console.log("GET /api")
console.log("GET /api/facts")
console.log("POST /api/facts")
console.log("GET /api/facts/:factId")
console.log("POST /api/facts/:factId")