"use client";

const { createContext, useState, useContext } = require("react");

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogpost, setBlogpost] = useState(null);
  const [error, setError] = useState(null);  // Error state for handling errors

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch blogs.");
      }

      const blogs = await response.json();
      setBlogs(blogs);
    } catch (error) {
      console.error(error);
      setError(error.message || "An unexpected error occurred.");
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch the blog post.");
      }

      const blogpost = await response.json();
      if (!blogpost.message) {
        setBlogpost(blogpost);
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const newBlog = async (
    title,
    summary,
    content,
    tags,
    permalink,
    imageUrl
  ) => {
    try {
      setLoading(true);

      const adminToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      if (!adminToken) {
        setError("Admin token is missing.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/newblog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            adminToken: adminToken,
          },
          body: JSON.stringify({
            title,
            summary,
            content,
            tags,
            permalink,
            imageUrl,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create new blog.");
      }

      // Handle successful blog creation response (if any)
      const newBlogData = await response.json();
      setBlogs((prevBlogs) => [newBlogData, ...prevBlogs]);
    } catch (error) {
      console.error(error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        getBlogs,
        blogpost,
        getBlogpost,
        newBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
