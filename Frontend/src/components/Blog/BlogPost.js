import React, { useState, useEffect } from 'react';
import Introduction from '../Introduction';
import { useParams } from 'react-router-dom';


const BlogPost =()=> {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const host = "http://localhost:5002";

  
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const permalink = useParams.permalink;
        const response = await fetch(`${host}/blog/${permalink}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
        });
        const blog = await response.json();
        setBlogPost(blog);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog post:', error.message);
        setLoading(false);
      }
    };
  
    fetchBlogPost();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }
  const mode='light';
  const blogtitle=[
    'No blogs to display'
  ]


  return (
    <div>
      <Introduction mode={mode} array={blogtitle} heading={"Blogs"}/>
      <h1>{blogPost.title}</h1>
      <p>Author: {blogPost.author}</p>
      <p>Date Created: {new Date(blogPost.dateCreated).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>
    </div>
  );
}

export default BlogPost;
