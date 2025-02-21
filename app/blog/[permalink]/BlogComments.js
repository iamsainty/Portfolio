"use client";

import { useBlogComment } from "@/context/blogCommentContext";
import React, { useEffect } from "react";
import Comment from "./Comment";

const BlogComments = ({ permalink }) => {
  const { getBlogComments, comments } = useBlogComment();

  useEffect(() => {
    if (permalink) {
      getBlogComments(permalink);
    }
    // eslint-disable-next-line
  }, [permalink]);

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
