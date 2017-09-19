var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");


var url ="mongodb://localhost:27017/test";

function getTweets(callback){
	mongodb.connect(url, (err,db)=>{
		if(err) throw err;

		var tweets = db.collection("test");
		tweets.find({}).toArray((err2,tweets)=>{
			if(err2) throw err2;

			callback(tweets);
		});
	});

};

/* GET home page. */
router.get('/tweets', function(req, res) {


	getTweets((tweets)=>{

		res.json(tweets);
	})
});

module.exports = router;
