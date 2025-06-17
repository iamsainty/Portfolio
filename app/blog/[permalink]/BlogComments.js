"use client";

import { useBlogComment } from "@/context/blogCommentContext";
import React, { useEffect } from "react";
import Comment from "./Comment";

const BlogComments = ({ blogpost }) => {
  const { getBlogComments, comments } = useBlogComment();

  useEffect(() => {
    if (blogpost) {
      getBlogComments(blogpost.permalink);
    }
  }, [blogpost.permalink, blogpost]);

  if (comments.length === 0) {
    return (
      <div>
        <p>No comments yet, Start the conversation!</p>
      </div>
    );
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default BlogComments;
