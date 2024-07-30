import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogContext from '../context/blogs/blogContext';
import { Container, Row, Col } from 'react-bootstrap';
import defaultblogcover from '../../media/Default/DefaultBlog.png';
import styled from 'styled-components';
import Loading from '../Loading';
import NotFound from '../NotFound'; // Import the NotFound component
import { FaTag } from 'react-icons/fa';
import { RiBarChartFill } from 'react-icons/ri';

const BlogContainer = styled(Container)`
  margin-top: 10vh;
  padding: 3vh;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 2vh;
  font-size: 4vh;
  color: #333;
`;

const MetaInfo = styled.p`
  font-size: 2vh;
  display: flex;
  align-items: center;
  color: #555;
`;

const Content = styled.div`
  font-size: 2.5vh;
  text-align: justify;
  margin-top: 3vh;
  color: #444;
  line-height: 1.6;
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 2vh;
`;

const MoreBlogsSection = styled.div`
  margin-top: 5vh;
  padding-top: 3vh;
  border-top: 1px solid #ddd;
`;

const MoreBlogsTitle = styled.h2`
  font-size: 3vh;
  margin-bottom: 3vh;
  color: #333;
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
    font-size: 2.5vh; // Increased font size for better readability
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
    font-size: 1.8vh; // Increased icon size for better visibility
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

const Tag = styled(Link)`
  margin: 0.5vh;
  padding: 0.75vh 1.5vh;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-decoration: none;
  color: black;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ViewMoreButton = styled(Link)`
  display: block;
  margin: 30px auto;
  padding: 10px 30px;
  font-size: 2vh;
  cursor: pointer;
  border-radius: 5px;
`;

const BlogPost = () => {
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentBlogsLoading, setRecentBlogsLoading] = useState(true);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [error, setError] = useState(null); // Add error state
    const { permalink } = useParams();
    const context = useContext(blogContext);
    const { blogs, fetchBlog } = context;

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                const blogDetails = await fetchBlog(permalink);
                setBlogPost(blogDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog details:', error);
                setError('Blog not found');
                setLoading(false);
            }
        };

        fetchBlogDetails();
        // eslint-disable-next-line
    }, [permalink]);

    useEffect(() => {
        if (blogPost) {
            document.title = `${blogPost.title} - Sainty`;
        }
        // eslint-disable-next-line
    }, [blogPost]);

    useEffect(() => {
        const fetchRecentBlogs = async () => {
            try {
                setRecentBlogsLoading(true);
                setRecentBlogs(blogs);
                setRecentBlogsLoading(false);
            } catch (error) {
                console.error('Error fetching recent blogs:', error);
                setRecentBlogsLoading(false);
            }
        };

        fetchRecentBlogs();
    }, [blogs]);

    const renderMetaInfo = (label, value) => (
        <MetaInfo>
            {label}: {value}
        </MetaInfo>
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <NotFound />; // Show NotFound component if there is an error
    }

    if (!blogPost) {
        return <div>Blog post not found</div>;
    }

    return (
        <BlogContainer>
            <Row className="mb-4">
                <Col md={6} className="d-flex align-items-center">
                    <div>
                        <Title>{blogPost.title}</Title>
                        {renderMetaInfo('Author', blogPost.author)}
                        {renderMetaInfo('Date Created', new Date(blogPost.dateCreated).toLocaleDateString())}
                        {renderMetaInfo('Views', blogPost.views)}
                        <div className="tags-container" style={{display: 'flex', alignItems: 'center'}}>
                            <FaTag className="tags-icon" />
                            <div className="tags">
                                {blogPost.tag.map((tag) => (
                                    <Tag to={`/blog/tag/${tag}`} key={tag} className="tag">{tag}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} style={{marginTop: '4vh'}}>
                    <CoverImage
                        src={`${blogPost.coverimage}`}
                        alt={`${blogPost.title} Preview`}
                        onError={(e) => { e.target.onerror = null; e.target.src = defaultblogcover; }}
                    />
                </Col>
            </Row>
            <Content dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            <MoreBlogsSection>
                <MoreBlogsTitle>Recent Blogs</MoreBlogsTitle>
                {recentBlogsLoading ? (
                    <Loading />
                ) : (
                    <GridContainer>
                        {recentBlogs.map((blog) => (
                            <Link to={`/blog/${blog.permalink}`} style={{ textDecoration: 'none' }} key={blog._id}>
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
                                                    <Tag to={`/blog/tag/${tag}`} key={tag} className="tag">{tag}</Tag>
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
                        ))}
                    </GridContainer>
                )}
                <ViewMoreButton to='/blog' className='btn btn-outline-dark'>
                    View More Blogs
                </ViewMoreButton>
            </MoreBlogsSection>
        </BlogContainer>
    );
};

export default BlogPost;
