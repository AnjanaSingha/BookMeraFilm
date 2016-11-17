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


var MovieSchema = mongoose.Schema({
    Title : String,
    Year : String,
    Runtime : String,
    Genre : String,
    Director : String,
    Actors : String,
    Language : String,
    Poster : String,
    Plot:String,
    imdbRating : String,
    imdbID:String,
    status :String
});

var RatingSchema = mongoose.Schema({
    Title : String,
    Rating : String
});

var Movie = mongoose.model('Movie',MovieSchema, 'Movie');
var Rating = mongoose.model('Rating',RatingSchema, 'Rating');

router.post('/rating/:m/:r', function (req, res) {
  var rating = new Rating({
    Title: req.params.m,
    Rating:req.params.r
  });
  rating.save(function(err,docs){
    console.log('Rating Saved Successfully'+docs);
  });
});

router.get('/getRating/:t', function (req, res) {
    Rating.find({Title:req.params.t}, function (err, docs) {
    res.json(docs);
    });
});

router.delete('/deleteRating/:id',function(req, res){
  Rating.remove({Title:req.params.id},function(err, docs){
    console.log('Ratings Removed Successfully');
  });
});


router.get('/movie', function (req, res) {
    Movie.find({}, function (err, docs) {
    res.json(docs);
    });
});

router.get('/moviePoster/:t', function (req, res) {
    Movie.find({Title:req.params.t}, function (err, docs) {
    res.json(docs);
    });
});

router.get('/movieExist/:i', function (req, res) {
    Movie.find({imdbID:req.params.i}, function (err, docs) {
    res.json(docs);
    });
});

router.post('/newMovie', function (req, res) {
  var movie = new Movie({
    Title: req.body.Title,
    Year: req.body.Year,
    Runtime: req.body.Runtime,
    Genre: req.body.Genre,
    Director: req.body.Director,
    Actors: req.body.Actors,
    Language: req.body.Language,
    Poster: req.body.Poster,
    Plot:req.body.Plot,
    imdbRating: req.body.imdbRating,
    imdbID:req.body.imdbID,
    status:"false"
  });
  movie.save(function(err,docs){
    console.log('Movie Saved Successfully'+docs);
  });
});

router.delete('/deleteMovie/:id',function(req, res){
  Movie.remove({_id:req.params.id},function(err, docs){
    console.log('Movie Removed Successfully');
  });
});

router.put('/updateMovie/:Title/:val',function(req,res){
Movie.findOneAndUpdate({ Title: req.params.Title },
  {
    $set:{status: req.params.val }
},function (err, data){
  res.json(data);
});
});

module.exports = router;
