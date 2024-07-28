const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  coverimage: {
    type: String,
  },
  author: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  permalink:{
    type :String,
    unique :true,
    required : true
  },
  tag:{
    type: [String],
    required: true
  },
  views:{
    type: Number,
    default: 0
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
