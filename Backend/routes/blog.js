const express = require("express");
const router = express.Router();
const upload = require("../middleware/blogcoverupload"); // Import the upload middleware
const userdetails = require("../middleware/userdetails"); // Assuming you have userdetails middleware
const { uploadImage } = require("../service/cloudinary");
const User = require("../models/User");
const BlogPost = require("../models/BlogPost");
const fs = require("fs");
const path = require("path");

// Fetching all blog posts (public)
router.get("/blogs", async (req, res) => {
  const { page = 1, limit = 3 } = req.query; // default values if not provided
  try {
    const blogPosts = await BlogPost.find()
      .sort({ dateCreated: -1 }) // Sort by dateCreated in descending order
      .skip((page - 1) * limit)
      .limit(limit);
    const totalBlogs = await BlogPost.countDocuments(); // get the total count of blogs
    res.json({ blogPosts: blogPosts, totalBlogs: totalBlogs });
  } catch (error) {
    res.status(500).send("Some Error occurred");
  }
});

//fetching all blogs with a specific tag
// Backend route for fetching blogs by tag with pagination
router.get("/tag/:tag", async (req, res) => {
  try {
    const tag = req.params.tag;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const skip = (page - 1) * limit;
    const foundBlogs = await BlogPost.find({ tag: { $in: [tag] } })
      .sort({ dateCreated: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await BlogPost.countDocuments({ tag: { $in: [tag] } });
    res.json({ foundBlogs, totalBlogs });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).send("Error fetching blog post");
  }
});

//fetching particular blog post
router.get("/:permalink", async (req, res) => {
  try {
    const permalink = req.params.permalink;
    const foundBlog = await BlogPost.findOne({ permalink: permalink });
    if (!foundBlog) return res.status(404).json("No such blog exists.");
    else {
      foundBlog.views += 1;
      await foundBlog.save();
      res.json({ foundBlog });
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).send("Error fetching blog post");
  }
});

// Adding a new blog post
router.post(
  "/newblog",
  upload.single("coverimage"),
  userdetails,
  async (req, res) => {
    try {
      const { title, summary, content, tag, permalink } = req.body;
      const localPath = req.file ? path.resolve(req.file.path) : null;
      let coverimage = null;

      if (localPath) {
        const uploadResponse = await uploadImage(localPath);
        if (uploadResponse) {
          coverimage = uploadResponse.secure_url;
          fs.unlinkSync(localPath); // Remove the file from local storage
        }
      }

      const user = await User.findById(req.user.id);
      const blogPost = new BlogPost({
        coverimage,
        author: user.name,
        title,
        summary,
        content,
        tag: tag.split(",").map((tag) => tag.trim()), // Split and trim tags
        permalink,
      });
      const savedPost = await blogPost.save();
      res.json({ savedPost });
    } catch (error) {
      console.error(error);
      res.status(500).send("Some Error occurred");
    }
  }
);

// Edit a blog post
router.put(
  "/editblog/:permalink",
  userdetails,
  upload.single("coverimage"),
  async (req, res) => {
    try {
      const { title, summary, content, tag } = req.body;

      const updatedFields = {
        title,
        summary,
        content,
        tag: tag.split(",").map((tag) => tag.trim()), // Split and trim tags
        lastUpdated: Date.now(),
      };

      if (req.file) {
        const localPath = path.resolve(req.file.path);
        const uploadResponse = await uploadImage(localPath);
        if (uploadResponse) {
          updatedFields.coverimage = uploadResponse.secure_url;
          fs.unlinkSync(localPath); // Remove the file from local storage
        }
      }

      const updatedPost = await BlogPost.findOneAndUpdate(
        { permalink: req.params.permalink },
        { $set: updatedFields },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).send("Some Error occurred");
    }
  }
);

// Delete a blog post
router.delete("/deleteblog/:id", userdetails, async (req, res) => {
  try {
    // Find the blog post by ID
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).send("Blog post not found");
    }

    // Delete the blog post
    await BlogPost.findByIdAndDelete(req.params.id);

    // Define the path to the cover image
    const coverImagePath = path.resolve(
      __dirname,
      "../media/blogcovers",
      `${blogPost.permalink}${path.extname(blogPost.coverimage)}`
    );

    // Check if the cover image exists and delete it
    fs.access(coverImagePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(coverImagePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Error deleting cover image: ${unlinkErr}`);
          } else {
            console.log("Cover image deleted successfully");
          }
        });
      } else {
        console.log("Cover image does not exist");
      }
    });

    res.json({ message: "Post has been deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Some Error occurred");
  }
});



module.exports = router;