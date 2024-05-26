import React, { useEffect, useState } from 'react';
import blogContext from './blogContext';
import { useNavigate } from 'react-router-dom';

const BlogState = (props) => {
    const host = process.env.host;
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [fetchComplete, setFetchComplete] = useState(false);

    const fetchBlogs = async () => {
        try {
            const url = `${host}/blog/blogs`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Unexpected response format');
            }

            const allBlogs = await response.json();
            setBlogs(allBlogs);
            setFetchComplete(true);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            // Handle error here, for example, display an error message to the user
        }
    };

    const fetchBlog = async (tag, permalink) => {
        try {
            const url = `${host}/blog/${tag}/${permalink}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Unexpected response format');
            }

            const blog = await response.json();
            return blog;
        } catch (error) {
            console.error("Error fetching blog:", error);
            throw error;
            // Handle error here, for example, display an error message to the user
        }
    };

    useEffect(() => {
        if (!fetchComplete) {
            fetchBlogs();
        }
        // eslint-disable-next-line
    }, [fetchComplete, navigate]);

    const newBlog = async (title, summary, content, tag, permalink) => {
        try {
            const url = `${host}/blog/newblog`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, summary, content, tag, permalink }),
            });

            if (!response.ok) {
                throw new Error('Failed to add new blog');
            }

            const blog = await response.json();
            setBlogs([...blogs, blog]);
        } catch (error) {
            console.error("Error adding blog:", error);
            // Handle error here, for example, display an error message to the user
        }
    };

    const deleteBlog = async (id) => {
        try {
            const url = `${host}/blog/deleteblog/${id}`;
            await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
            });

            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
            // Handle error here, for example, display an error message to the user
        }
    };

    const editBlog = async (id, title, summary, content, tag) => {
        try {
            const url = `${host}/blog/editblog/${id}`;
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, summary, content, tag }),
            });

            setBlogs(blogs.map(blog =>
                blog._id === id ? { ...blog, title, summary, content, tag } : blog
            ));
        } catch (error) {
            console.error("Error editing blog:", error);
            // Handle error here, for example, display an error message to the user
        }
    };

    return (
        <blogContext.Provider value={{ blogs, newBlog, deleteBlog, editBlog, fetchBlog }}>
            {props.children}
        </blogContext.Provider>
    );
};

export default BlogState;
