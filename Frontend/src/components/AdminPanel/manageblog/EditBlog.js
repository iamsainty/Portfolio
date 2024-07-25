import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import blogContext from '../../context/blogs/blogContext';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 15vh;
  padding-bottom: 15vh;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2vh;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 600px;
`;

const ModalHeader = styled.div`
  font-weight: bolder;
  font-size: 3.5vh;
`;

const ModalBody = styled.div`
  font-size: 2.5vh;
`;

const FormControl = styled.input`
  border: 1px black solid;
  padding: 1vh;
  width: 100%;
  margin-bottom: 1vh;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 1vh;
  border: none;
  background: #000;
  color: #fff;
  font-size: 1.6vh;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`;

const EditBlog = () => {
  const { permalink } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", summary: "", content: "", tag: "", permalink: "" });
  const [msg, setMsg] = useState('');
  const context = useContext(blogContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }

    const fetchBlogDetails = async () => {
      try {
        const blogDetails = await context.fetchBlog(permalink);
        setBlog(blogDetails);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setMsg('Error fetching blog details. Please try again later.');
      }
    };

    fetchBlogDetails();
    // eslint-disable-next-line
  }, [permalink]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blog.title === '' || blog.summary === '' || blog.permalink === '') {
        setMsg("All fields are required");
        return;
      } else if (blog.summary.length > 150 || blog.summary.length < 125) {
        setMsg("Summary should be between 125 to 150 characters");
        return;
      } else {
        await context.editBlog(permalink, blog.title, blog.summary, blog.content, blog.tag);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setMsg('An error occurred. Please try again later.');
    }
  };

  const handleChange = (value) => {
    setBlog({ ...blog, content: value });
  };

  return (
    <>
      {showModal && (
        <>
          <ModalBackdrop />
          <Modal>
            <ModalHeader>Yeah...</ModalHeader>
            <ModalBody>Blog has been updated successfully</ModalBody>
            <Link to='/admin/manageblog'>
              <FormButton>Go to Manage Blogs</FormButton>
            </Link>
          </Modal>
        </>
      )}
      <Container className="container">
        <div className="row align-items-center justify-content-center">
          <div>
            <h1 style={{ fontSize: '5vh', fontWeight: 'bolder', paddingBottom: '3vh' }}>
              Edit Blog
            </h1>
            <form onSubmit={handleSubmit}>
              <FormControl
                type="text"
                id="title"
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                value={blog.title}
                placeholder='Title'
              />
              <FormControl
                type="text"
                id="summary"
                onChange={(e) => setBlog({ ...blog, summary: e.target.value })}
                value={blog.summary}
                placeholder='Summary'
              />
              <div className="mb-3">
                <ReactQuill
                  theme="snow"
                  value={blog.content}
                  onChange={handleChange}
                  placeholder="Write your blog content here..."
                  style={{ border: '1px black solid', minHeight: '200px' }}
                />
              </div>
              <FormControl
                type="text"
                id="tag"
                onChange={(e) => setBlog({ ...blog, tag: e.target.value })}
                value={blog.tag}
                placeholder='Tag (separated by comma)'
              />
              <FormControl
                disabled
                type="text"
                id="permalink"
                onChange={(e) => setBlog({ ...blog, permalink: e.target.value })}
                value={blog.permalink}
                placeholder='Permalink'
              />
              <div style={{ color: 'red', paddingBottom: '1vh' }}>{msg}</div>
              <FormButton type="submit">Update Blog</FormButton>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditBlog;
