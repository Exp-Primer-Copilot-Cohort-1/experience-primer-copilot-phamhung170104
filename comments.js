// Create web server
var express = require('express');
var router = express.Router();

// Import mongoose
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/test');

// Create schema
var commentSchema = mongoose.Schema({
  Name: String,
  Comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// GET request
router.get('/', function(req, res, next) {
  res.render('comments');
});

// POST request
router.post('/', function(req, res, next) {
  // Get data from form
  var name = req.body.name;
  var comment = req.body.comment;

  // Create new comment
  var comment = new Comment({
    Name: name,
    Comment: comment
  });

  // Save comment to database
  comment.save(function(err, comment) {
    if (err) return console.error(err);
    console.dir(comment);
  });

  // Redirect to comments page
  res.redirect('/comments');
});

// GET request for comments
router.get('/getcomments', function(req, res, next) {
  // Get comments from database
  Comment.find(function(err, comments) {
    if (err) return console.error(err);
    // Display comments
    res.json(comments);
  });
});

module.exports = router;
 


