import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';
import blogContext from '../context/blogs/blogContext';
import Introduction from '../Introduction';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const BlogContainer = styled.div`
  margin-top: 50px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  overflow: hidden;
  background-color: white;
`;

const SearchLabel = styled.div`
  background-color: white;
  color: black;
  height: 100%;
  min-width: 7vh;
  font-weight: bold;
  font-size: 1.8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5vh;
  border-right: 1px solid black;
`;

const BlogCard = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 3vh;
  transition: transform 0.3s ease-in-out;
  border-radius: 2vh;
  border: 1px black solid;

  &:hover {
    transform: scale(1.03);
  }
`;

const BlogCategory = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { tag } = useParams();
  const { fetchCategoryBlog } = useContext(blogContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const allblogs = await fetchCategoryBlog(tag);
      setBlogs(allblogs);
      setLoading(false);
    };

    fetchBlogs();
    // eslint-disable-next-line
  }, [tag]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BlogContainer className='container'>
      <Introduction array={blogs.map(blog => blog.title)} heading={tag} />
      <div style={{ height: '20vh', width: '100%' }}></div>
      <SearchContainer className="mb-5">
        <SearchLabel>Search</SearchLabel>
        <Input
          placeholder="Search blog..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            flex: '1',
            height: '100%',
            padding: '2.5vh 1.5vh',
            fontSize: '1.6vh',
            borderRadius: '0',
            border: 'none',
            backgroundColor: 'white',
            color: 'black',
            outline: 'none',
          }}
        />
      </SearchContainer>
      {loading ? (
        <Loading />
      ) : filteredBlogs.length < 2 ? (
        <p style={{ fontSize: '3vh', fontWeight: 'bold', textAlign: 'center' }}> Not Enough Blogs to Show</p>
      ) : (
        <div className="row">
          {filteredBlogs.map((blog) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={blog._id}>
              <Link to={`/blog/${blog.permalink}`} style={{ textDecoration: 'none' }}>
                <BlogCard>
                  <div className="card-body my-3" style={{ color: '#191919' }}>
                    <h2 style={{ fontSize: '2.5vh', fontWeight: 'bold', marginBottom: '1vh', height: '6vh' }}>{blog.title}</h2>
                    <p className="card-text" style={{ fontSize: '2vh', marginBottom: '1.5vh', height: '12vh' }}>{blog.summary ? blog.summary.slice(0, 130) : ""}...</p>
                    <p style={{ fontSize: '1.5vh', marginBottom: '1vh' }}>Author: {blog.author}</p>
                    <p style={{ fontSize: '1.5vh', marginBottom: '1vh' }}>
                      {blog.dateCreated === blog.lastUpdated ? (
                        `Published on: ${new Date(blog.dateCreated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                      ) : (
                        `Last updated on: ${new Date(blog.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                      )}
                    </p>
                    <p className="card-text" style={{ fontSize: '1.5vh', marginBottom: '1vh', display: 'inline-flex', alignItems: 'center' }}>
                      <i className="material-icons" style={{ marginRight: '0.75vh' }}>bar_chart</i>
                      {blog.views} views
                    </p>
                  </div>
                </BlogCard>
              </Link>
            </div>
          ))}
        </div>
      )}
      <br /><br />
    </BlogContainer>
  );
}

export default BlogCategory;
