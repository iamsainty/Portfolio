const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
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
  shortDescription: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  blogurl:{
    type :String,
    unique :true,
    required : true
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
