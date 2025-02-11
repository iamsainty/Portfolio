"use client";

const { createContext, useState, useContext } = require("react");

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogpost, setBlogpost] = useState(null);

  const getBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 },
        }
      );
      const blogs = await response.json();
      setBlogs(blogs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBlogpost = async (permalink) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${permalink}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 },
        }
      );

      const blogpost = await response.json();
      if (!blogpost.message) {
        setBlogpost(blogpost);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogContext.Provider
      value={{ blogs, loading, getBlogs, blogpost, getBlogpost }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
