"use client";

const { createContext, useContext, useState } = require("react");

const blogCommentContext = createContext();

export const BlogCommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const newComment = async (permalink, comment) => {
    try {
      setLoading(true);
      const userToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];

      if (!userToken) {
        setLoading(false);
        return;
      }      

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogcomment/newcomment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userToken: userToken,
          },
          body: JSON.stringify({ permalink, comment }),
        }
      );

      const data = await response.json();

      if (data.comment) {
        setComments([...comments, data.comment]);
      } 

      return data.message;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBlogComments = async (permalink) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogcomment/getcomment/${permalink}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.comments) {
        const comments = data.comments;
        setComments(comments);
      }
      setError(data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <blogCommentContext.Provider
      value={{ comments, newComment, loading, error, getBlogComments }}
    >
      {children}
    </blogCommentContext.Provider>
  );
};

export const useBlogComment = () => useContext(blogCommentContext);
