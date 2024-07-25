import React, { useEffect, useState } from 'react';
import blogContext from './blogContext';

const BlogState = (props) => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const host = 'http://localhost:5002';
    const host = 'https://hey-sainty-backend.vercel.app';

    const commonHeaders = {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token")
    };

    const fetchBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/blogs`;
            const response = await fetch(url, {
                method: "GET",
                headers: commonHeaders,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }

            const blogData = await response.json();
            setBlogs(blogData.blogPosts);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoryBlog = async (tag) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/tag/${tag}`;
            const response = await fetch(url, {
                method: "GET",
                headers: commonHeaders,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch category blogs');
            }

            const blogs = await response.json();
            return blogs.foundBlogs;
        } catch (error) {
            setError(error.message);
            console.error("Error fetching category blogs:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchBlog = async (permalink) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/${permalink}`;
            const response = await fetch(url, {
                method: "GET",
                headers: commonHeaders,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }

            const blog = await response.json();
            return blog.foundBlog;
        } catch (error) {
            setError(error.message);
            console.error("Error fetching blog:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (blogs.length === 0) {
            fetchBlogs();
        }
        // eslint-disable-next-line
    }, []);

    const newBlog = async (title, summary, content, tag, permalink) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/newblog`;
            const response = await fetch(url, {
                method: "POST",
                headers: commonHeaders,
                body: JSON.stringify({ title, summary, content, tag, permalink }),
            });

            if (!response.ok) {
                throw new Error('Failed to add new blog');
            }

            const { savedPost } = await response.json();
            setBlogs([...blogs, savedPost]);
        } catch (error) {
            setError(error.message);
            console.error("Error adding blog:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/deleteblog/${id}`;
            await fetch(url, {
                method: "DELETE",
                headers: commonHeaders,
            });

            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (error) {
            setError(error.message);
            console.error("Error deleting blog:", error);
        } finally {
            setLoading(false);
        }
    };

    const editBlog = async (id, title, summary, content, tag) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/editblog/${id}`;
            await fetch(url, {
                method: "PUT",
                headers: commonHeaders,
                body: JSON.stringify({ title, summary, content, tag }),
            });

            setBlogs(blogs.map(blog =>
                blog._id === id ? { ...blog, title, summary, content, tag } : blog
            ));
        } catch (error) {
            setError(error.message);
            console.error("Error editing blog:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <blogContext.Provider value={{ blogs, fetchBlogs, loading, error, fetchCategoryBlog, newBlog, deleteBlog, editBlog, fetchBlog }}>
            {props.children}
        </blogContext.Provider>
    );
};

export default BlogState;
