import React, { useEffect, useState } from 'react'
import blogContext from './blogContext'
import { useNavigate } from 'react-router-dom';

const BlogState = (props) => {
    const host = "http://localhost:5002";
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [fetchComplete, setFetchComplete] = useState(false);

    const fetchblogs = async () => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }
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
            const allBlogs = await response.json();
            setBlogs(allBlogs);
            setFetchComplete(true);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        if (!fetchComplete) {
            fetchblogs();
        }
        // eslint-disable-next-line
    }, [fetchComplete, navigate]);

    const newblog = async (title, summary, content, tag, permalink) => {
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
            const blog = await response.json();
            setBlogs([...blogs, blog]);
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    const deleteblog = async (id) => {
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
        }
    };

    const editblog = async (id, title, summary, content, tag) => {
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
        }
    };
  return (
    <blogContext.Provider value={{ blogs, newblog, deleteblog, editblog, fetchblogs }}>
        {props.children}
    </blogContext.Provider>
  )
}

export default BlogState;
