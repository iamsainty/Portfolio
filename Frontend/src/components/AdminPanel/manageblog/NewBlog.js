import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import blogContext from '../../context/blogs/blogContext';
import Loading from '../../Loading'; // Assuming this is your custom loading component

const NewBlog = () => {
    const [blog, setBlog] = useState({ title: "", summary: "", content: "", tag: [], permalink: "", coverimage: null });
    const [msg, setMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { newBlog, fetchBlog } = useContext(blogContext);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg(''); // Clear previous messages
        try {
            if (!blog.title || !blog.summary || !blog.permalink || !blog.content) {
                setMsg("All fields are required");
                setLoading(false);
                return;
            }
            if (blog.summary.length > 150 || blog.summary.length < 125) {
                setMsg("Summary should be between 125 to 150 characters");
                setLoading(false);
                return;
            }
            if (!/^[a-z0-9-]+$/.test(blog.permalink)) {
                setMsg("Permalink can only contain lowercase letters, digits, and hyphens");
                setLoading(false);
                return;
            }

            // Check if the permalink already exists
            try {
                await fetchBlog(blog.permalink);
                setMsg('Permalink is already used');
                setLoading(false);
                return;
            } catch (error) {
                if (error.message !== 'Failed to fetch blog') {
                    setMsg('An error occurred while checking the permalink. Please try again later.');
                    setLoading(false);
                    return;
                }
            }

            const formData = new FormData();
            formData.append('title', blog.title);
            formData.append('summary', blog.summary);
            formData.append('content', blog.content);
            formData.append('tag', blog.tag.join(','));
            formData.append('permalink', blog.permalink);
            if (blog.coverimage) {
                formData.append('coverimage', blog.coverimage);
            }

            const error = await newBlog(formData);
            if (!error) {
                setMsg('');
                setShowModal(true);
                setBlog({ title: '', summary: '', content: '', tag: [], permalink: '', coverimage: null });
            } else {
                setMsg(error.message);
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            setMsg('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event, editor) => {
        const data = editor.getData();
        setBlog({ ...blog, content: data });
    };

    const handleTagChange = (e) => {
        const tags = e.target.value.split(',').map(tag => tag.trim());
        setBlog({ ...blog, tag: tags });
    };

    return (
        <>
            {loading && <Loading />}
            {showModal &&
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-flex align-items-center justify-content-center" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ width: '100%', padding: '2vh' }}>
                            <div className="modal-content" style={{ padding: '2vh' }}>
                                <div className="modal-header">
                                    <h1 className="modal-title" style={{ fontWeight: 'bolder', fontSize: '3.5vh' }}>Yeah...</h1>
                                </div>
                                <div className="modal-body">
                                    <p style={{ fontSize: '2.5vh' }}>Blog has been added successfully</p>
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
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <input type="text" className="form-control" id="title" onChange={(e) => setBlog({ ...blog, title: e.target.value })} value={blog.title} name='title' placeholder='Title' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="summary" onChange={(e) => setBlog({ ...blog, summary: e.target.value })} value={blog.summary} name='summary' placeholder='Summary' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div className="mb-3">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={blog.content}
                                    onChange={handleChange}
                                    config={{
                                        toolbar: {
                                            items: [
                                                'heading', '|',
                                                'bold', 'italic', 'underline', 'code', 'codeBlock', '|',
                                                'link', 'blockQuote', 'insertTable', '|',
                                                'undo', 'redo'
                                            ]
                                        }
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="tag" onChange={handleTagChange} value={blog.tag.join(', ')} name='tag' placeholder='Tag (separated by comma)' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="permalink" onChange={(e) => setBlog({ ...blog, permalink: e.target.value })} value={blog.permalink} name='permalink' placeholder='Permalink' style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div className="mb-3">
                                <input type="file" className="form-control" id="coverimage" onChange={(e) => setBlog({ ...blog, coverimage: e.target.files[0] })} name='coverimage' accept=".jpg, .png, .jpeg" style={{ border: '1px black solid', padding: '1vh' }} />
                            </div>
                            <div style={{ color: 'red', paddingBottom: '1vh' }}>{msg}</div>
                            <button type="submit" className="btn btn-outline-dark btn-block" style={{ width: '100%' }}>Create Blog</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewBlog;
