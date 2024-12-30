import React from "react";

import blogActivityContext from "./blogActivityContext";

const BlogActivityState = (props) => {
  const host = "https://hey-sainty-backend.vercel.app";
  //   const host = "http://localhost:5002";

  const likeBlog = async (blogId) => {
    try {
      const url = `${host}/blog/blog-liked`;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          userToken: localStorage.getItem("userToken"),
        },
        body: JSON.stringify({ blogId }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <blogActivityContext.Provider value={{ likeBlog }}>
      {props.children}
    </blogActivityContext.Provider>
  );
};

export default BlogActivityState;
