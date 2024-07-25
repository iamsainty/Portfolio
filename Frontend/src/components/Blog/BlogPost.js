import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import blogContext from '../context/blogs/blogContext';


const BlogPost = () => {
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { permalink } = useParams();

    const context = useContext(blogContext)


    useEffect(() => {

        const fetchBlogDetails = async () => {
            try {
                const blogDetails = await context.fetchBlog(permalink);
                setBlogPost(blogDetails.foundBlog); // Set initial blog state here
                setLoading(false)
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlogDetails();
    }, [permalink, context]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blogPost) {
        return <div>Blog post not found</div>;
    }


    return (
        <div className='container' style={{ marginTop: '20vh', padding: '3vh'}}>
            <h1 style={{ fontWeight: 'bold', marginBottom: '5vh', fontSize: '5vh' }}>{blogPost.title}</h1>
            <p style={{ fontSize: '2vh'}}>Author: {blogPost.author}</p>
            <p style={{ fontSize: '2vh'}}>Date Created: {new Date(blogPost.dateCreated).toLocaleDateString()}</p>
            <p className="card-text" style={{ fontSize: '2vh', display: 'inline-flex', alignItems: 'center' }}>
                <i className="material-icons" style={{ marginRight: '0.75vh' }}>bar_chart</i>
                {blogPost.views} views
            </p>
            <div className='' dangerouslySetInnerHTML={{ __html: blogPost.content }} style={{ fontSize: '2.5vh', textAlign: 'justify', marginTop: '3vh' }}></div>
        </div>
    );
}

export default BlogPost;
