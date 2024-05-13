import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogContext from '../../context/blogs/blogContext';

const NewBlog = () => {
    const [blog, setBlog] = useState({ title: "", summary: "", content: "", tag: "", permalink: "" });
    const [msg, setMsg] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const context = useContext(blogContext);

    const host = "http://localhost:5002";

    useEffect(() => {
        // Check if user is logged in, if not, redirect to login
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }

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
                const allBlogs = await response.json();
                setBlogs(allBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            }
        };

        fetchBlogs();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validation
            if (blog.title === '' || blog.summary === '' || blog.permalink === '') {
                setMsg("All fields are required");
                return;
            }
            // Check if summary exceeds 250 characters
            else if (blog.summary.length > 250) {
                setMsg("Summary cannot exceed 250 characters");
                return;
            } else {
                const permalinkExists = blogs.some(b => b.permalink === blog.permalink);
                if (permalinkExists) {
                    setMsg('Permalink is already used');
                    return;
                } else {
                    context.newblog(blog.title, blog.summary, blog.content, blog.tag, blog.permalink);
                    setShowModal(true);
                    setBlog({ title: '', summary: '', content: '', tag: '', permalink: '' });
                }
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            setMsg('An error occurred. Please try again later.');
        }
    };

    const handleChange = (content) => {
        setBlog({ ...blog, content });
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
                                    <p style={{ fontSize: '2.5vh' }}>Blog has been added succesfully</p>
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
                            Add a new blog
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
                                <input type="text" className="form-control" id="permalink" onChange={(e) => setBlog({ ...blog, permalink: e.target.value })} value={blog.permalink} name='permalink' placeholder='Permalink' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div style={{ color: 'red', paddingBottom: '1vh' }}>{msg}</div>
                            <button type="submit" className="btn btn-outline-dark btn-block" style={{ width: '100%' }}>Create Blog</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBlog;
