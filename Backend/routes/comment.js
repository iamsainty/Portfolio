const express = require("express");
const router = express.Router();

const BlogComment = require("../models/BlogComment");

// route to add a comment
router.post("/new-comment", async (req, res) => {
  try {
    const { blogId, userId, comment } = req.body;
    const newComment = new BlogComment({
      blogId,
      userId,
      comment,
      commentDate: new Date(),
      commentStatus: "active",
      commentLikes: 0,
    });
    const savedComment = await newComment.save();
    res.status(201).json({ success: true, savedComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", success: false });
  }
});

// route to find comments of a particular blog
router.get("/blog-comments/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await BlogComment.find({ blogId });
    comments.sort((a, b) => b.commentDate - a.commentDate);
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", success: false });
  }
});

// liking a comment
router.put("/like-comment/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Use atomic increment with $inc
    const updatedComment = await BlogComment.findByIdAndUpdate(
      commentId,
      { $inc: { commentLikes: 1 } },
      { new: true }
    );

    if (!updatedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    res.status(200).json({ success: true, updatedComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to like comment", success: false });
  }
});

module.exports = router;
