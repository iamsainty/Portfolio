import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import blogContext from '../../context/blogs/blogContext';
import Loading from '../../Loading'; // Assuming this is your custom loading component
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 15vh;
  padding-bottom: 15vh;
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
  font-size: 1.6vh;
`;

const EditBlog = () => {
  const { permalink } = useParams();
  const [blog, setBlog] = useState({ title: "", summary: "", content: "", tag: "", permalink: "", coverimage: null });
  const [msg, setMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(blogContext);

  useEffect(() => {
    if (!localStorage.getItem('hey-sainty-token')) {
      navigate('/login');
      return;
    }

    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const blogDetails = await context.fetchBlog(permalink);
        setBlog({
          ...blogDetails,
          tag: blogDetails.tag.join(', '), // Convert tag array to comma-separated string
        });
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setMsg('Error fetching blog details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
    // eslint-disable-next-line
  }, [permalink]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (blog.title === '' || blog.summary === '' || blog.permalink === '') {
        setMsg("All fields are required");
        setLoading(false);
        return;
      } else if (blog.summary.length > 150 || blog.summary.length < 125) {
        setMsg("Summary should be between 125 to 150 characters");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('summary', blog.summary);
      formData.append('content', blog.content);
      formData.append('tag', blog.tag);
      formData.append('permalink', blog.permalink);
      if (blog.coverimage) {
        formData.append('coverimage', blog.coverimage);
      }

      const error = await context.editBlog(permalink, formData);
      if (error) {
        setMsg(error.message);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setMsg('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setBlog({ ...blog, content: data });
  };

  const handleFileChange = (e) => {
    setBlog({ ...blog, coverimage: e.target.files[0] });
  };

  return (
    <>
      {loading && <Loading />}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-flex align-items-center justify-content-center" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ width: '100%', padding: '2vh' }}>
              <div className="modal-content" style={{ padding: '2vh' }}>
                <div className="modal-header">
                  <h1 className="modal-title" style={{ fontWeight: 'bolder', fontSize: '3.5vh' }}>Yeah...</h1>
                </div>
                <div className="modal-body">
                  <p style={{ fontSize: '2.5vh' }}>Blog has been updated successfully</p>
                </div>
                <div className="modal-footer" style={{ display: 'flex', width: '100%' }}>
                  <Link to='/admin/manageblog' style={{ width: '100%' }}>
                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }}>Go to Manage Blogs</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Container className="container">
        <div className="row align-items-center justify-content-center">
          <div>
            <h1 style={{ fontSize: '5vh', fontWeight: 'bolder', paddingBottom: '3vh' }}>
              Edit Blog
            </h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <CKEditor
                  editor={ClassicEditor}
                  data={blog.content}
                  onChange={handleChange}
                  config={{
                    toolbar: {
                      items: [
                        'heading', '|',
                        'bold', 'italic', 'underline', 'code', 'codeBlock', 'htmlEmbed', '|',
                        'link', 'blockQuote', 'insertTable', '|',
                        'undo', 'redo'
                      ]
                    },
                    htmlEmbed: {
                      showPreviews: true
                    }
                  }}
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
              <div className="mb-3">
                <FormControl
                  type="file"
                  id="coverimage"
                  onChange={handleFileChange}
                  accept=".jpg, .png, .jpeg"
                />
              </div>
              <div style={{ color: 'red', paddingBottom: '1vh' }}>{msg}</div>
              <FormButton className='btn btn-outline-dark' type="submit">Update Blog</FormButton>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditBlog;
