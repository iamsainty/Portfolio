import React, { useState, useEffect } from 'react';
import Introduction from '../Introduction';
import { Input } from 'antd';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BlogContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  border: ${({ mode }) => `1px solid ${mode === 'dark' ? 'white' : 'black'}`};
  overflow: hidden;
  background-color: ${({ mode }) => (mode === 'dark' ? 'black' : 'white')};
`;

const SearchLabel = styled.div`
  background-color: ${({ mode }) => (mode === 'dark' ? 'black' : 'white')};
  color: ${({ mode }) => (mode === 'dark' ? 'white' : 'black')};
  height: 100%;
  min-width: 7vh;
  font-weight: bold;
  font-size: 1.8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5vh;
  border-right: ${({ mode }) => `1px solid ${mode === 'dark' ? 'white' : 'black'}`};
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
  padding-bottom: 10px;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

function Blog(props) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const host = "http://localhost:5002";

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
        setBlogs(allblogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BlogContainer className='container'>
      <Introduction array={blogs.map(blog => blog.title)} heading={"Read Blogs"} mode={props.mode} />
      <div style={{ height: '20vh', width: '100%' }}></div>
      <SearchContainer mode={props.mode} className="mb-5">
        <SearchLabel mode={props.mode}>Search</SearchLabel>
        <Input
          placeholder="Search certificate..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            flex: '1',
            height: '100%',
            padding: '2.5vh 1.5vh', // Adjusted padding for increased height
            fontSize: '1.6vh',
            borderRadius: '0',
            border: 'none',
            backgroundColor: `${props.mode === 'dark' ? 'black' : 'white'}`,
            color: `${props.mode === 'dark' ? 'white' : 'black'}`,
            outline: 'none',
          }}
        />
      </SearchContainer>
      {loading ? (
        <div>Loading...</div>
      ) : filteredBlogs.length === 0 ? (
        <p>No blogs to display</p>
      ) : (
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
          {filteredBlogs.map((blog) => (
            <div className="col" key={blog.title}>
              <BlogCard style={{ background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'white', border: `${props.mode === 'dark' ? 'white' : 'black'} 0.25px solid` }}>
                {/* <img src={blog.preview} className="card-img-top" alt={`${blog.title} Preview`} /> */}
                <div className="card-body my-3" style={{ color: props.mode === 'dark' ? 'white' : '#191919' }}>
                  <h2 style={{ fontSize: '2vh', fontWeight: 'bold' }}>{blog.title}</h2>
                  <p className="card-text" style={{ margin: '0.5vh', fontSize: '1.75vh' }}>{blog.summary}</p>
                </div>
              </BlogCard>
            </div>
          ))}
        </BlogSlider>
      )}
      <br /><br />
    </BlogContainer>
  );
}

export default Blog;
