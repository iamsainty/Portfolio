import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import Introduction from '../../Introduction';
import blogContext from '../../context/blogs/blogContext';
import { Link, useNavigate } from 'react-router-dom';

const BlogContainer = styled.div`
  margin-top: 50px;
`;

const BlogCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: '0 4px 8px rgba(0, 0, 0, 0.2)';
  margin-bottom: 5vh;
  padding: 4vh;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: '0 4px 8px rgba(0, 0, 0, 0.2)';
  }
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

const SearchInput = styled(Input)`
  flex: 1;
  height: 100%;
  padding: 2.5vh 1.5vh;
  font-size: 1.6vh;
  border: none;
  border-radius: 0;
  background-color: white;
  color: black;
  outline: none;
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
  border-right: black;
`;

const ManageBlog = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState(null);
    const navigate = useNavigate();

    const context = useContext(blogContext);
    const { blogs, fetchBlogs, deleteBlog } = context;

    useEffect(() => {
        fetchBlogs(); // Fetch blogs using context method
        // eslint-disable-next-line
    }, []);

    const handleDelete = (blogId) => {
        setBlogIdToDelete(blogId);
        setShowModal(true);
    };

    const handleDeleteConfirm = () => {
        deleteBlog(blogIdToDelete);
        setShowModal(false);
        // Optional: Refresh the list without reload
        fetchBlogs();
    };

    const handleEdit = (permalink) => {
        navigate(`/admin/editblog/${permalink}`);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const operations = ["Add a new blog", "Edit a blog", "Delete a blog"];

    return (
        <>
            {showModal &&
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-flex align-items-center justify-content-center" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ width: '100%', padding: '2vh' }}>
                            <div className="modal-content" style={{ padding: '2vh' }}>
                                <div className="modal-header">
                                    <h1 className="modal-title" style={{ fontWeight: 'bolder', fontSize: '3.5vh' }}>Confirmation</h1>
                                </div>
                                <p style={{ fontSize: '2.5vh', padding: '2vh' }}>Are you sure to delete the selected blog?</p>
                                <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <button type="button" className="btn btn-outline-dark" style={{ flex: 1, marginRight: '0.5rem' }} onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-dark" style={{ flex: 1, marginLeft: '0.5rem' }} onClick={handleDeleteConfirm}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            <BlogContainer className='container'>
                <Introduction array={operations} heading={"Manage Blogs"} mode={props.mode} />
                <div style={{ height: '20vh' }}></div>
                <BlogCard>
                    <h2 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Add a new blog</h2>
                    <Link to='/admin/newblog'>
                        <button type="submit" className="btn btn-outline-dark flex-grow-1" style={{ marginTop: '2vh' }}>&#43; Click here</button>
                    </Link>
                </BlogCard>
                <SearchContainer style={{ marginBottom: '10vh' }} mode={props.mode}>
                    <SearchLabel mode={props.mode}>Search</SearchLabel>
                    <SearchInput
                        placeholder="Search blog..."
                        value={searchQuery}
                        onChange={handleSearch}
                        mode={props.mode}
                    />
                </SearchContainer>
                {blogs.length === 0 ? (
                    <p style={{ fontSize: '3vh', fontWeight: 'bold', textAlign: 'center' }}>No blogs to display</p>
                ) : (
                    filteredBlogs.map((blog) => (
                        <BlogCard key={blog._id}>
                            <div className="col">
                                <h2 style={{ fontSize: '3vh', fontWeight: 'bold' }}>{blog.title}</h2>
                                <p className="card-text" style={{ margin: '0', fontSize: '2vh' }}>{blog.summary}</p>
                            </div>
                            <div className="d-flex">
                                <button type="submit" className="btn btn-outline-dark flex-grow-1" onClick={() => handleEdit(blog.permalink)} style={{ margin: '4vh 1vh 4vh 0' }}>&#9998; Edit</button>
                                <button type="submit" className="btn btn-outline-dark flex-grow-1" onClick={() => handleDelete(blog._id)} style={{ margin: '4vh 0 4vh 1vh' }}>&times; Delete</button>
                            </div>
                        </BlogCard>
                    ))
                )}
            </BlogContainer>
        </>
    );
};

export default ManageBlog;
