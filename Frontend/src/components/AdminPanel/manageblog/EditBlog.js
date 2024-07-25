import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogContext from '../../context/blogs/blogContext';

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
                setBlog(blogDetails.foundBlog); // Set initial blog state here
            } catch (error) {
                console.error('Error fetching blog details:', error);
                setMsg('Error fetching blog details. Please try again later.');
            }
        };

        fetchBlogDetails();
    }, [permalink, navigate, context]);

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
                await context.editBlog(permalink, blog.title, blog.summary, blog.content, blog.tag); // Use id here
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            setMsg('An error occurred. Please try again later.');
        }
    };

    const handleChange = (field, value) => {
        setBlog({ ...blog, [field]: value }); // Update only the specific field
    };


    return (
        <>
            {showModal &&
                <>
                    <div className="modal-backdrop fade show"></div> {/* Add this overlay div */}
                    <div className="modal-backdrop fade show"></div> {/* Add this overlay div */}
                    <div className="modal fade show d-flex align-items-center justify-content-center" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ width: '100%', padding: '2vh' }}>
                            <div className="modal-content" style={{ padding: '2vh' }}>
                                <div className="modal-header">
                                    <h1 className="modal-title" style={{ fontWeight: 'bolder', fontSize: '3.5vh' }}>Yeah...</h1>
                                </div>
                                <div className="modal-body">
                                    <p style={{ fontSize: '2.5vh' }}>Blog has been updated succesfully</p>
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
            }
            <div className="container" style={{ paddingTop: '15vh', paddingBottom: '15vh' }}>
                <div className="row align-items-center justify-content-center">
                    <div>
                        <h1 style={{ fontSize: '5vh', fontWeight: 'bolder', paddingTop: '0vh', paddingBottom: '3vh' }}>
                            Edit Blog
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="title" onChange={(e) => setBlog({ ...blog, title: e.target.value })} value={blog.title} name='title' placeholder='Title' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="summary" onChange={(e) => setBlog({ ...blog, summary: e.target.value })} value={blog.summary} name='summary' placeholder='Summary' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div className="mb-3">
                                <ReactQuill
                                    theme="snow"
                                    value={blog.content}
                                    onChange={handleChange}
                                    placeholder="Write your blog content here..."
                                    style={{ border: '1px black solid', minHeight: '200px' }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="tag" onChange={(e) => setBlog({ ...blog, tag: e.target.value })} value={blog.tag} name='tag' placeholder='tag (separated by comma)' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div className="mb-3">
                                <input disabled type="text" className="form-control" id="permalink" onChange={(e) => setBlog({ ...blog, permalink: e.target.value })} value={blog.permalink} name='permalink' placeholder='Permalink' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div style={{ color: 'red', paddingBottom: '1vh' }}>{msg}</div>
                            <button type="submit" className="btn btn-outline-dark btn-block" style={{ width: '100%' }}>Update Blog</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditBlog;
