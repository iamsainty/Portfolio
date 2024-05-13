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


//Fetching single blog
router.get('/:blogurl', async (req, res) => {
    try {
        const blogurl = req.blogurl;
        const foundBlog = await BlogPost.findOne({ "blogurl": blogurl });
        if (!foundBlog) return res.status(404).send("No such blog exists.");
        else {
            res.json(foundBlog);
        }
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).send('Error fetching blog post');
    }
});


// Adding a new blog post
router.post('/newblog', userdetails, async (req, res) => {
    try {
        const { title, summary, content, tag, permalink } = req.body;
        const user = await User.findById(req.user.id);
        const blogPost = new BlogPost({
            author: user.name, // Assuming you have some way to track the author's ID
            title,
            summary,
            content,
            tag,
            permalink
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
        const { title, summary, content, tag } = req.body;
        const updatedFields = {
            title,
            summary,
            content,
            tag,
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
