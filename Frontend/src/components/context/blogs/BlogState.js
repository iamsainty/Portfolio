import React, { useEffect, useState } from 'react';
import blogContext from './blogContext';

const BlogState = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [tagblogs, setTagblogs] = useState([]);
    const [totalBlog, setTotalBlog] = useState();
    const [totaltagBlog, setTotaltagBlog] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

//    const host = 'http://localhost:5002';
     const host = 'https://hey-sainty-backend.vercel.app';

    const commonHeaders = {
        "token": localStorage.getItem("hey-sainty-token")
    };

    const fetchBlogs = async (page = 1, limit = 3) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/blogs?page=${page}&limit=${limit}`;
            const response = await fetch(url, {
                method: "GET",
                headers: commonHeaders,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }

            const blogData = await response.json();
            if (page === 1) {
                setBlogs(blogData.blogPosts);
            } else {
                setBlogs(prevBlogs => [...prevBlogs, ...blogData.blogPosts]);
            }
            const totalBlog = blogData.totalBlogs;
            setTotalBlog(totalBlog);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    const fetchCategoryBlog = async (tag, page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const limit = 3; // Number of blogs to fetch per page
            const url = `${host}/blog/tag/${tag}?page=${page}&limit=${limit}`;
            const response = await fetch(url, {
                method: "GET",
                headers: commonHeaders,
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch category blogs');
            }
    
            const foundBlogs = await response.json();
    
            if (page === 1) {
                setTagblogs(foundBlogs.foundBlogs);
            } else {
                setTagblogs(prevBlogs => [...prevBlogs, ...foundBlogs.foundBlogs]);
            }
            const totaltagblog = foundBlogs.totalBlogs;
            setTotaltagBlog(totaltagblog);
        } catch (error) {
            setError(error.message);
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

    const newBlog = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/newblog`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "token": localStorage.getItem('hey-sainty-token')
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to add new blog');
            }
    
            const { savedPost } = await response.json();
            setBlogs([...blogs, savedPost]);
        } catch (error) {
            setError(error.message);
            return error;
        } finally {
            setLoading(false);
        }
    };
    


    const deleteBlog = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${host}/blog/deleteblog/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('hey-sainty-token')
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (error) {
            setError(error.message);
            return error;
        } finally {
            setLoading(false);
        }
    };
    

    const editBlog = async (permalink, formData) => {
        setLoading(true);
        setError(null);
        try {
          const url = `${host}/blog/editblog/${permalink}`;
          const response = await fetch(url, {
            method: "PUT", // Ensure using PUT method to update resource
            headers: {
              "token": localStorage.getItem('hey-sainty-token')
            },
            body: formData, // Send formData directly without setting Content-Type
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update blog');
          }
      
          const updatedBlogData = await response.json();
      
          setBlogs(blogs.map(blog =>
            blog.permalink === updatedBlogData.permalink ? { ...blog, ...updatedBlogData } : blog
          ));
        } catch (error) {
          setError(error.message);
          return error; // Return the error for further handling
        } finally {
          setLoading(false);
        }
      };
      
    

    return (
        <blogContext.Provider value={{ blogs, totalBlog, fetchBlogs, loading, error, fetchCategoryBlog, tagblogs, totaltagBlog, newBlog, deleteBlog, editBlog, fetchBlog }}>
            {props.children}
        </blogContext.Provider>
    );
};

export default BlogState;
