const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// GET /api/blog/posts
router.get('/posts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/blog/posts
router.post('/posts', async (req, res) => {
  try {
    const { author, title, shortDescription, coverImage, content, tags } = req.body;
    const newBlogPost = new BlogPost({ author, title, shortDescription, coverImage, content, tags });
    await newBlogPost.save();
    res.status(201).json({ message: 'Blog post created successfully', blogPost: newBlogPost });
  } catch (error) {
    console.error('Error creating blog post:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
