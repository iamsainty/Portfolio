import React, { useState, useEffect } from 'react';

function Blog(props) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const host = "http://localhost:5002";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const url = `${host}/blog/blogs`
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authtoken": localStorage.getItem("token")
          },
        });
        const allblogs = await response.json();
        setBlogs(allblogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className='container'>
      {blogs.length === 0 ? (
        <p>No blogs to display</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>Date Created: {new Date(blog.dateCreated).toLocaleDateString()}</p>
            <p>{blog.shortDescription}</p>
            {/* You can add more details or links for each blog post as needed */}
          </div>
        ))
      )}
    </div>
  );
}

export default Blog;
