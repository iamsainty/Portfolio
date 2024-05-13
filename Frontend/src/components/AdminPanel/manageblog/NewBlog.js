import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogContext from '../../context/blogs/blogContext';

const NewBlog = () => {
    const [blog, setBlog] = useState({ title: "", summary: "", content: "", tag: "", permalink: "" });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const context = useContext(blogContext);

    useEffect(() => {
        // Check if user is logged in, if not, redirect to login
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
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
            }
            else if (context.newblog) {
                context.newblog(blog.title, blog.summary, blog.content, blog.tag, blog.permalink);
                setMsg(`"${blog.title}" has been added`);
                setTimeout(() => { setMsg('') }, 3000)
                setBlog({ title: '', summary: '', content: '', tag: '', permalink: '' });
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
    )
}

export default NewBlog;