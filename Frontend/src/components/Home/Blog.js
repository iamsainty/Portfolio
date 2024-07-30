import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';
import { RiBarChartFill } from 'react-icons/ri';
import Loading from '../Loading';
import BlogContext from '../context/blogs/blogContext';
import defaultblogcover from '../../media/Default/DefaultBlog.png';
import Slider from 'react-slick';

const BlogContainer = styled.div`
  margin-top: 50px;
`;

const BlogCard = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  padding: 2vh 3vh;
  transition: transform 0.3s ease-in-out;
  border-radius: 10px;
  border: none;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 2vh;
  }

  .card-body {
    color: #191919;
  }

  h2 {
    font-size: 2.5vh;
    font-weight: bold;
    margin-bottom: 1.5vh;
  }

  .tags-container {
    display: flex;
    align-items: center;
    margin-top: 1vh;
  }

  .tags-icon {
    margin-right: 1vh;
    font-size: 1.8vh;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75vh;
    font-size: 1.5vh;
  }

  .tag {
    margin: 0.5vh;
    padding: 0.75vh 1.5vh;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    text-decoration: none;
    color: black;
  }

  p {
    font-size: 1.6vh;
    margin-bottom: 1.5vh;
  }
`;

const ViewAllButton = styled(Link)`
  display: block;
  margin: 30px auto;
  padding: 10px 30px;
  font-size: 2vh;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
`;

const BlogSlider = styled(Slider)`
  .slick-slide {
    padding: 0 10px;
  }

  .slick-dots {
    bottom: -30px;
  }
`;

function Blog() {
    const { blogs, loading } = useContext(BlogContext);

    const recentBlogs = blogs.slice(0, 3);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
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
        ],
    };

    return (
        <BlogContainer className='container'>
            {loading ? (
                <div><Loading /></div>
            ) : recentBlogs.length === 0 ? (
                <></>
            ) : (
                <>
                    <h2 className='text-center my-5' style={{ fontSize: '5vh', fontWeight: 'bold', color: 'black' }}>Blogs</h2>
                    <BlogSlider {...settings}>
                        {recentBlogs.map((blog) => (
                            <div key={blog._id}>
                                <Link to={`/blog/${blog.permalink}`} style={{ textDecoration: 'none' }}>
                                    <BlogCard>
                                        <img
                                            src={`${blog.coverimage}`}
                                            alt={`${blog.title} Preview`}
                                            onError={(e) => { e.target.onerror = null; e.target.src = defaultblogcover; }}
                                        />
                                        <div className="card-body">
                                            <h2>{blog.title}</h2>
                                            <div className="tags-container">
                                                <FaTag className="tags-icon" />
                                                <div className="tags">
                                                    {blog.tag.map((tag) => (
                                                        <Link to={`/blog/tag/${tag}`} key={tag} className="tag">{tag}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <p>{blog.summary ? blog.summary.slice(0, 130) : ""}...</p>
                                            <p>Author: {blog.author}</p>
                                            <p>
                                                {blog.dateCreated === blog.lastUpdated ? (
                                                    `Published on: ${new Date(blog.dateCreated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                                                ) : (
                                                    `Last updated on: ${new Date(blog.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                                                )}
                                            </p>
                                            <p style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                <RiBarChartFill style={{ marginRight: '1vh' }} />
                                                {blog.views} views
                                            </p>
                                        </div>
                                    </BlogCard>
                                </Link>
                            </div>
                        ))}
                    </BlogSlider>
                    <ViewAllButton className='btn btn-outline-dark' to="/blog">View all blogs</ViewAllButton>
                </>
            )}
        </BlogContainer>
    );
}

export default Blog;
