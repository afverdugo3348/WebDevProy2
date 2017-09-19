var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");


var url ="mongodb://192.168.0.1:27017/test";

function getLabs(callback){
	mongodb.connect(url, (err,db)=>{
		if(err) throw err;

		var labs = db.collection("test");
		labs.find({}).toArray((err2,labs)=>{
			if(err2) throw err2;

			callback(labs);
		});
	});

};

/* GET home page. */
router.get('/labs', function(req, res) {


	getTweets((labs)=>{

		res.json(labs);
	})
});

module.exports = router;
