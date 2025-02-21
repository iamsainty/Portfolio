"use client"

const { createContext, useContext, useState } = require("react");

const blogCommentContext = createContext();

export const BlogCommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const newComment = async (blogId, comment) => {
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
          body: JSON.stringify({ blogId, comment }),
        }
      );

      const data = await response.json();

      if (data.commentCreated) {
        setComments([...comments, data.commentCreated]);
      } else {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBlogComments = async (blogId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogcomment/getcomment/${blogId}`,
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
