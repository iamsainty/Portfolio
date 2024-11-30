import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import blogContext from "../context/blogs/blogContext";
import { Container } from "react-bootstrap";
import defaultblogcover from "../../media/Default/DefaultBlog.png";
import styled from "styled-components";
import Loading from "../Loading";
import NotFound from "../NotFound"; // Import the NotFound component
import { FaTag } from "react-icons/fa";
import { RiBarChartFill } from "react-icons/ri";
import CommentSection from "./Comment/CommentSection";

const BlogContainer = styled(Container)`
  margin-top: 10vh;
  padding: 3vh;
  border-radius: 10px;
`;

const Section = styled.div`
  margin: 4vh 0;
  font-size: 18px;
`;

const CodeBlock = styled.code`
  background-color: #f5f5f5;
  color: #ffooff;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
  display: block;
`;

const Quote = styled.blockquote`
  font-style: italic;
  border-left: 4px solid #ccc;
  padding-left: 16px;
  color: #444;
`;

const QuoteCaption = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 1vh;
`;

const LinkTool = styled.a`
  text-decoration: underline;
  color: #0056b3;
  font-weight: bold;
`;

const ListItem = styled.li`
  margin-bottom: 1;
  padding-left: 1;
`;

const MoreBlogsSection = styled.div`
  margin-top: 5vh;
  padding-top: 3vh;
  border-top: 1px solid #ddd;
`;

const MoreBlogsTitle = styled.h1`
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

  const [content, setContent] = useState();

  document.body.style.background = "white";

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const blogDetails = await fetchBlog(permalink);
        setBlogPost(blogDetails);
        setContent(JSON.parse(blogDetails.content[0]).blocks);
        setLoading(false);
      } catch (error) {
        setError("Blog not found");
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
        setRecentBlogsLoading(false);
      }
    };

    fetchRecentBlogs();
  }, [blogs]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />; // Show NotFound component if there is an error
  }

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  console.log(content);

  return (
    <BlogContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="col-12 col-md-8">
          <img
            src={`${blogPost.coverimage}`}
            alt={`${blogPost.title} Preview`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultblogcover;
            }}
            width={"100%"}
            height={"auto"}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "15px",
            }}
          />
          <h1 style={{ marginTop: "5vh", fontWeight: "700" }}>
            {blogPost.title}
          </h1>
          <hr />
          <div
            className="d-lg-flex"
            style={{ justifyContent: "space-between" }}
          >
            <span>By : {blogPost.author}</span>
            <br className="d-lg-none" />
            <span>
              Date Published :{" "}
              {new Date(blogPost.dateCreated).toLocaleDateString()}
            </span>
          </div>
          <hr />
          {content.map((block) => {
            return (
              <Section>
                {block.type === "paragraph" && <p> {block.data.text}</p>}
                {block.type === "header" && (
                  <h2 style={{ fontWeight: "600" }}>{block.data.text} </h2>
                )}
                {block.type === "list" && (
                  <ol>
                    {block.data.items.map((item) => {
                      return (
                        <>
                          <ListItem
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </>
                      );
                    })}
                  </ol>
                )}
                {block.type === "code" && (
                  <CodeBlock>{block.data.code}</CodeBlock>
                )}
                {block.type === "quote" && (
                  <>
                    <Quote
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    />
                    <QuoteCaption
                      dangerouslySetInnerHTML={{ __html: block.data.caption }}
                    />
                  </>
                )}
                {block.type === "linkTool" && (
                  <LinkTool href={block.data.link}>{block.data.link} </LinkTool>
                )}
                {block.type === "delimeter" && <hr />}
              </Section>
            );
          })}
          <hr style={{ margin: "5vh 0" }} />
          <h3 style={{ fontWeight: "bolder", fontSize: "35px" }}>Comments</h3>
          <CommentSection blogId={blogPost._id} />
        </div>
      </div>
      <MoreBlogsSection>
        <MoreBlogsTitle>Recent Blogs</MoreBlogsTitle>
        {recentBlogsLoading ? (
          <Loading />
        ) : (
          <GridContainer>
            {recentBlogs.map((blog) => (
              <Link
                to={`/blog/${blog.permalink}`}
                style={{ textDecoration: "none" }}
                key={blog._id}
              >
                <BlogCard>
                  <img
                    src={`${blog.coverimage}`}
                    alt={`${blog.title} Preview`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultblogcover;
                    }}
                  />
                  <div className="card-body">
                    <h2>{blog.title}</h2>
                    <div className="tags-container">
                      <FaTag className="tags-icon" />
                      <div className="tags">
                        {blog.tag.map((tag) => (
                          <Tag
                            to={`/blog/tag/${tag}`}
                            key={tag}
                            className="tag"
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <p>{blog.summary ? blog.summary.slice(0, 130) : ""}...</p>
                    <p>Author: {blog.author}</p>
                    <p>
                      {blog.dateCreated === blog.lastUpdated
                        ? `Published on: ${new Date(
                            blog.dateCreated
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`
                        : `Last updated on: ${new Date(
                            blog.lastUpdated
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`}
                    </p>
                    <p style={{ display: "inline-flex", alignItems: "center" }}>
                      <RiBarChartFill style={{ marginRight: "1vh" }} />
                      {blog.views} views
                    </p>
                  </div>
                </BlogCard>
              </Link>
            ))}
          </GridContainer>
        )}
        <ViewMoreButton to="/blog" className="btn btn-outline-dark">
          View More Blogs
        </ViewMoreButton>
      </MoreBlogsSection>
    </BlogContainer>
  );
};

export default BlogPost;
