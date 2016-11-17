var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/MovieBooking');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
});



var TheatreSchema = mongoose.Schema({
  name: String,
  city: String
});

var Theatre = mongoose.model('Theatre',TheatreSchema, 'Theatre');

router.get('/theatres', function (req, res) {
    Theatre.find({}, function (err, docs) {
    res.json(docs);
    });
});

router.post('/newTheatre', function (req, res) {
  var theatre = new Theatre({
    name: req.body.name,
    city: req.body.city
  });
  theatre.save(function(err,docs){
    console.log('Theatre Saved Successfully');
  });
});

router.delete('/deleteTheatre/:id',function(req, res){
  Theatre.remove({_id:req.params.id},function(err, docs){
    console.log('Theatre Removed Successfully');
  });
});

router.get('/', function (req, res) {
    Theatre.find({}, function (err, docs) {
    res.json(docs);
    });
});



module.exports = router;
