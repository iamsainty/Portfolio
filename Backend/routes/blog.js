const express = require('express');
const router = express.Router();
const User = require("../models/User");
const BlogPost = require('../models/BlogPost');
const userdetails = require('../middleware/userdetails');

// Fetching all blog posts (public)
router.get('/blogs', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.json(blogPosts);
    } catch (error) {
        res.status(500).send("Some Error occurred");
    }
});

// Adding a new blog post
router.post('/newblog', userdetails, async (req, res) => {
    try {
        const { title, shortDescription, coverImage, content, tags } = req.body;
        const user = await User.findById(req.user.id);
        const blogPost = new BlogPost({
            author: user.name, // Assuming you have some way to track the author's ID
            title,
            shortDescription,
            coverImage,
            content,
            tags
        });
        const savedPost = await blogPost.save();
        res.json(savedPost);
    } catch (error) {
      console.log(error);
        res.status(500).send("Some Error occurred");
    }
});

// Update a blog post
router.put('/editblog/:id', userdetails, async (req, res) => {
    try {
        const { title, shortDescription, coverImage, content, tags } = req.body;
        const updatedFields = {
            title,
            shortDescription,
            coverImage,
            content,
            tags,
            lastUpdated: Date.now()
        };
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).send("Some Error occurred");
    }
});

// Delete a blog post
router.delete('/deleteblog/:id', userdetails, async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.json("Post has been deleted successfully");
    } catch (error) {
        res.status(500).send("Some Error occurred");
    }
});

module.exports = router;
