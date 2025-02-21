"use client";

import { useBlogComment } from "@/context/blogCommentContext";
import { useBlog } from "@/context/blogContext";
import React, { useEffect } from "react";
import Comment from "./Comment";

const BlogComments = ({ permalink }) => {
  const { blogpost, getBlogpost } = useBlog();
  const { getBlogComments, comments } = useBlogComment();

  useEffect(() => {
    if (permalink) {
      getBlogpost(permalink);
    }
    // eslint-disable-next-line
  }, [permalink]);

  useEffect(() => {
    if (blogpost?._id) {
      getBlogComments(blogpost._id);
    }
    // eslint-disable-next-line
  }, [blogpost]);

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
