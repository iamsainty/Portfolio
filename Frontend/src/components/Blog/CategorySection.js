import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const BlogContainer = styled.div`
  margin-top: 50px;
`;

const BlogSlider = styled(Slider)`
  .slick-slide div {
    margin: 0 auto;
  }
`;

const BlogCard = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 3vh;
  transition: transform 0.3s ease-in-out;
  border-radius: 2vh;
  border: none; /* Remove the border */

  &:hover {
    transform: scale(1.03);
  }
`;


const CategorySection = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);


    const host = process.env.host;

    const tag = props.tag;

    useEffect(() => {
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
                const allblogs = await response.json();

                // Filter blogs with a particular tag
                const filteredBlogs = allblogs.filter(blog => blog.tag.includes(tag));

                setBlogs(filteredBlogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
                setLoading(false);
            }
        };

        fetchBlogs();
        // eslint-disable-next-line
    }, [tag]); // <-- Include tag as a dependency




    return (
        <BlogContainer className='container'>
            <h2 className='container' style={{ fontWeight: 'bold', fontSize: '4vh', marginBottom: '5vh' }}>{tag}</h2>
            {loading ? (
                <div>Loading...</div>
            ) : blogs.length === 0 ? (
                <p style={{ fontSize: '3vh', fontWeight: 'bold', textAlign: 'center' }}>No blogs to display</p>) : (
                <BlogSlider
                    infinite={true}
                    speed={1000}
                    slidesToShow={3}
                    slidesToScroll={1}
                    autoplay={true} // Autoplay enabled
                    autoplaySpeed={2500} // Adjust autoplay speed as needed (milliseconds)
                    responsive={[
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            },
                        },
                    ]}
                >
                    {blogs.map((blog) => (
                        <div className="col" key={blog._id}>
                            <Link to={`/blog/${tag}/${blog.permalink}`} style={{ textDecoration: 'none' }}>
                                <BlogCard style={{ background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'white', border: `${props.mode === 'dark' ? 'white' : 'black'} 0.25px solid` }}>
                                    {/* <img src={blog.preview} className="card-img-top" alt={`${blog.title} Preview`} /> */}
                                    <div className="card-body my-3" style={{ color: props.mode === 'dark' ? 'white' : '#191919' }}>
                                        <h2 style={{ fontSize: '2.5vh', fontWeight: 'bold', marginBottom: '1vh', height: '6vh' }}>{blog.title}</h2>
                                        <p className="card-text" style={{ fontSize: '2vh', marginBottom: '1.5vh', height: '9vh' }}>{blog.summary ? blog.summary.slice(0, 140) : ""}...</p>
                                        <p style={{ fontSize: '1.5vh', marginBottom: '1vh' }}>Author: {blog.author}</p>
                                        <p style={{ fontSize: '1.5vh', marginBottom: '1vh' }}>
                                            {blog.dateCreated === blog.lastUpdated ? (
                                                `Published on: ${new Date(blog.dateCreated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                                            ) : (
                                                `Last updated on: ${new Date(blog.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                                            )}
                                        </p>
                                        <p className="card-text" style={{ fontSize: '1.5vh', display: 'inline-flex', alignItems: 'center' }}>
                                            <i className="material-icons" style={{ marginRight: '0.75vh' }}>bar_chart</i>
                                            {blog.views} views
                                        </p>
                                    </div>
                                </BlogCard>
                            </Link>
                        </div>
                    ))}
                </BlogSlider>
            )}
        </BlogContainer>
    );
}

export default CategorySection
