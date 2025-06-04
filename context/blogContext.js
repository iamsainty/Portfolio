"use client";

const { createContext, useState, useContext } = require("react");

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogpost, setBlogpost] = useState(null);
  const [error, setError] = useState(null);

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

      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        setError(data.error || "Failed to fetch blogs.");
      }
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

  const newNewsletterRecipient = async (name, email) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/newsletter/new-recipient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await response.json();

      return data.message;
    } catch (error) {
      console.error(error);
      return "Something went wrong";
    }
  };

  const newsletterUnsubscribe = async (recipientId, reason) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/newsletter/unsubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipientId, reason }),
        }
      );

      const data = await response.json();

      return data.message;
    } catch (error) {
      console.error(error);
      return "Something went wrong";
    }
  };

  const newsletterResubscribe = async (recipientId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/newsletter/resubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipientId }),
        }
      );

      const data = await response.json();

      return data.message;
    } catch (error) {
      console.error(error);
      return "Something went wrong";
    }
  };

  const sendNewsletter = async (title, content, permalink) => {
    try {
      const adminToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      if (!adminToken) {
        return "Admin token missing. Please login again.";
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/newsletter/new-letter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            adminToken: adminToken,
          },
          body: JSON.stringify({
            title,
            content,
            permalink,
          }),
        }
      );

      const data = await response.json();

      return data.message;
    } catch (error) {
      console.error(error);
      return "Something went wrong";
    }
  };

  const getRecipient = async (recipientId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/newsletter/recipientdata`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipientId }),
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      return "Something went wrong";
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
        newNewsletterRecipient,
        newsletterUnsubscribe,
        sendNewsletter,
        getRecipient,
        newsletterResubscribe,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
