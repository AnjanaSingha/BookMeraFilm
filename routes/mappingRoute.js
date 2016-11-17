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

var MappingSchema = mongoose.Schema({
    Title : String,
    City : String,
    Theatre : String,
    Date : String,
    ShowTimings : Array,
});

var MovieMapping = mongoose.model('MovieMapping',MappingSchema, 'MovieMapping');

router.route('/moviemapping').get(function(req, res) {
  MovieMapping.find({}, function (err, docs) {
  res.json(docs);
  });
});
router.route('/selmovie/:t').get(function(req, res) {
MovieMapping.find({Theatre:req.params.t},function(err, Data) {
    if (err) {
      return res.send(err);
    }
    res.send(Data);
  });
});
router.route('/selmoviename/:m').get(function(req, res) {
MovieMapping.find({Title:req.params.m},function(err, Data) {
    if (err) {
      return res.send(err);
    }
    res.send(Data);

  });
});

router.delete('/deleteMapping/:id',function(req, res){
  MovieMapping.remove({_id:req.params.id},function(err, docs){
    console.log('Mapping Removed Successfully');
  });
});

// router.delete('/deleteMappingM/:Title',function(req, res){
//   MovieMapping.remove({Title:req.params.Title},function(err, docs){
//     console.log('Mapping Removed Successfully');
//   });
// });

router.post('/newMapping', function (req, res) {
  var mapping = new MovieMapping({
    Title: req.body.Title,
    City: req.body.City,
  Theatre: req.body.Theatre,
    Date: req.body.Date,
    ShowTimings: req.body.ShowTimings
  });
  mapping.save(function(err,docs){
    console.log('Mapping Saved Successfully'+docs);

  });
});



module.exports = router;
