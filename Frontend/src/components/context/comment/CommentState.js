import React, { useState } from "react";

import commentContext from "./commentContext";

const CommentState = (props) => {
  // const host = 'https://hey-sainty-backend.vercel.app';
  const host = "http://localhost:5002";

  const [comments, setComments] = useState([]);

  const fetchComments = async (blogId) => {
    try {
      const url = `${host}/comment/blog-comments/${blogId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const newComment = async (blogid, comment) => {
    try {
      const url = `${host}/comment/new-comment`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userToken: localStorage.getItem("userToken"),
        },
        body: JSON.stringify({ blogid, comment }),
      });
      const data = await response.json();
      if (data.success) {
        setComments([...comments, data.comment]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <commentContext.Provider value={{ comments, fetchComments, newComment }}>
      {props.children}
    </commentContext.Provider>
  );
};

export default CommentState;
