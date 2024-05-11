import { useState, useEffect } from "react";
import BlogContext from "./blogcontext";
import { useNavigate } from "react-router-dom";

const BlogState = (props) => {
    const host = "http://localhost:5002";
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [fetchComplete, setFetchComplete] = useState(false); 

    const fetchBlogs = async () => {
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
            fetchBlogs();
        }
        // eslint-disable-next-line
    }, [fetchComplete, navigate]);

    const newBlog = async (title, shortDescription, content) => {
        try {
            const url = `${host}/blog/newblog`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, shortDescription, content }),
            });
            if (!response.ok) {
                throw new Error('Failed to add blog');
            }
            const blog = await response.json();
            setBlogs([...blogs, blog]);
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            const url = `${host}/blog/deletenote/${id}`;
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

    const editBlog = async (id, title, shortDescription, content) => {
        try {
            const url = `${host}/blog/editblog/${id}`;
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")  
                },
                body: JSON.stringify({ title, shortDescription, content }),
            });
            setBlogs(blogs.map(blog =>
                blog._id === id ? { ...blog, title, shortDescription, content } : blog
            ));
        } catch (error) {
            console.error("Error editing blog:", error);
        }
    };

    return (
        <BlogContext.Provider value={{ blogs, newBlog, deleteBlog, editBlog, fetchBlogs }}>
            {props.children}
        </BlogContext.Provider>
    );
};

export default BlogState;
