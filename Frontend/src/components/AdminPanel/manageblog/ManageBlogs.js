import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Introduction from '../../Introduction';
import blogContext from '../../context/blogs/blogContext';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../Loading';

const BlogContainer = styled.div`
  margin-top: 50px;
`;

const BlogCard = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 3vh;
  transition: transform 0.3s ease-in-out;
  border-radius: 1vh;
  border: none;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    border-radius: 1vh;
    object-fit: cover;
    height: auto;
  }

  .card-body {
    color: #191919;
  }

  h2 {
    font-size: 2vh;
    font-weight: bold;
    margin-bottom: 1vh;
    height: 6vh;
  }

  .tags-container {
    display: flex;
    align-items: center;
    margin-top: 1vh;
  }

  .tags-icon {
    margin-right: 0.5vh;
    font-size: 1.5vh;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5vh;
    font-size: 1.5vh;
  }

  .tag {
    margin: 0.5vh;
    padding: 0.5vh 1vh;
    border: 1px solid #ddd;
    border-radius: 1vh;
    background-color: #f9f9f9;
    text-decoration: none;
    color: black;
  }

  p {
    font-size: 1.6vh;
    margin-bottom: 1.5vh;
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 30px;
  font-size: 2vh;
  cursor: pointer;
  border-radius: 5px;
`;

const ManageBlog = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [msg, setMsg] = useState(null);

    const context = useContext(blogContext);
    const { blogs, fetchBlogs, deleteBlog, totalBlog } = context;

    useEffect(() => {
        fetchBlogs(page);
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        if (!localStorage.getItem('hey-sainty-token')) {
          navigate('/login');
        }
    }, [navigate]);

    const handleDelete = (blogId) => {
        setBlogIdToDelete(blogId);
        setShowModal(true);
    };

    const handleDeleteConfirm = async () => {
        const error = await deleteBlog(blogIdToDelete);
        if (error) {
            setMsg(`Error deleting blog: ${error}`);
        } else {
            setShowModal(false);
            fetchBlogs(page);
        }
    };

    const handleEdit = (permalink) => {
        navigate(`/admin/editblog/${permalink}`);
    };

    const loadMoreBlogs = () => {
        if (blogs.length < totalBlog) {
            setIsLoading(true);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
                setIsLoading(false);
            }, 750);
        }
    };

    const operations = ["Add a new blog", "Edit a blog", "Delete a blog"];

    return (
        <>
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-flex align-items-center justify-content-center" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ width: '100%', padding: '2vh' }}>
                            <div className="modal-content" style={{ padding: '2vh' }}>
                                <div className="modal-header">
                                    <h1 className="modal-title" style={{ fontWeight: 'bolder', fontSize: '3.5vh' }}>Confirmation</h1>
                                </div>
                                <p style={{ fontSize: '2.5vh', padding: '2vh' }}>Are you sure you want to delete the selected blog?</p>
                                {msg && <p style={{ color: 'red', fontSize: '2vh' }}>{msg}</p>}
                                <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <button type="button" className="btn btn-outline-dark" style={{ flex: 1, marginRight: '0.5rem' }} onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-dark" style={{ flex: 1, marginLeft: '0.5rem' }} onClick={handleDeleteConfirm}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <BlogContainer className='container'>
                <Introduction array={operations} heading={"Manage Blogs"} mode={props.mode} />
                <div style={{ height: '20vh' }}></div>
                <BlogCard>
                    <h2 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Add a new blog</h2>
                    <Link to='/admin/newblog'>
                        <button type="submit" className="btn btn-outline-dark flex-grow-1" style={{ marginTop: '2vh' }}>&#43; Click here</button>
                    </Link>
                </BlogCard>
                {blogs.length === 0 ? (
                    <p style={{ fontSize: '3vh', fontWeight: 'bold', textAlign: 'center' }}>No blogs to display</p>
                ) : (
                    <>
                        <GridContainer>
                            {blogs.map((blog) => (
                                <div key={blog._id}>
                                    <BlogCard>
                                        <div className="col">
                                            <h2 style={{ fontSize: '3vh', fontWeight: 'bold' }}>{blog.title}</h2>
                                            <p className="card-text" style={{ margin: '0', fontSize: '2vh' }}>{blog.summary}</p>
                                        </div>
                                        <div className="d-flex">
                                            <button type="submit" className="btn btn-outline-dark flex-grow-1" onClick={() => handleEdit(blog.permalink)} style={{ margin: '4vh 1vh 4vh 0' }}>&#9998; Edit</button>
                                            <button type="submit" className="btn btn-outline-dark flex-grow-1" onClick={() => handleDelete(blog._id)} style={{ margin: '4vh 0 4vh 1vh' }}>&times; Delete</button>
                                        </div>
                                    </BlogCard>
                                </div>
                            ))}
                        </GridContainer>
                        {isLoading ? (
                            <Loading />
                        ) : blogs.length < totalBlog ? (
                            <LoadMoreButton className='btn btn-outline-dark' onClick={loadMoreBlogs} disabled={isLoading}>
                                Load More Blogs
                            </LoadMoreButton>
                        ) : (
                            <p style={{ textAlign: 'center', marginTop: '20px' }}>No more blogs to load</p>
                        )}
                    </>
                )}
            </BlogContainer>
        </>
    );
};

export default ManageBlog;
