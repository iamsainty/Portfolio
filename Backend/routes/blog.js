const express = require('express');
const router = express.Router();
const User = require("../models/User");
const BlogPost = require('../models/BlogPost');
const userdetails = require('../middleware/userdetails');

// Fetching all blog posts (public)
router.get('/blogs', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.json({blogPosts: blogPosts});
    } catch (error) {
        res.status(500).send("Some Error occurred");
    }
});

router.get('/tag/:tag', async (req, res) => {
    try {
        const tag = req.params.tag; // Correct way to access URL parameters
        const foundBlogs = await BlogPost.find({ tag: { $in: [tag] } });
        if (foundBlogs.length === 0) {
            return res.status(404).json("No such blog exists.");
        } else {
            res.json({ foundBlogs });
        }
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).send('Error fetching blog post');
    }
});

router.get('/:permalink', async (req, res) => {
    try {
        const permalink = req.params.permalink; // Correct way to access URL parameters
        const foundBlog = await BlogPost.findOne({ "permalink": permalink });
        if (!foundBlog) return res.status(404).json("No such blog exists.");
        else {
            foundBlog.views+=1;
            foundBlog.save()
            res.json({foundBlog});
        }
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).send('Error fetching blog post');
    }
});

// Adding a new blog post
router.post('/newblog', userdetails, async (req, res) => {
    try {
        const { coverimage, title, summary, content, tag, permalink } = req.body;
        const user = await User.findById(req.user.id);
        const blogPost = new BlogPost({
            coverimage,
            author: user.name,
            title,
            summary,
            content,
            tag,
            permalink
        });
        const savedPost = await blogPost.save();
        res.json({ savedPost });
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error occurred");
    }
});

// Update a blog post
// Edit a blog post
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
        res.json({updatedPost});
    } catch (error) {
        res.status(500).send("Some Error occurred");
    }
});



// Delete a blog post
router.delete('/deleteblog/:id', userdetails, async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.json({message: "Post has been deleted successfully"});
    } catch (error) {
        res.status(500).send("Some Error occurred");
    }
});

module.exports = router;