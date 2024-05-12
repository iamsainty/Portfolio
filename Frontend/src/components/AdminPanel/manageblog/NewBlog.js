import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import BlogContext from '../../context/blogcontext';

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 20px;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
`;

const NewBlog = () => {
  const navigate = useNavigate();
  const { newBlog } = useContext(BlogContext);

  const [blog, setBlog] = useState({
    title: '',
    shortDescription: '',
    content: EditorState.createEmpty(),
    blogUrl: '',
    tags: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleContentChange = (content) => {
    setBlog({ ...blog, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!blog.title.trim()) {
      setErrorMsg('Title cannot be empty');
      return;
    }
    if (!blog.shortDescription.trim()) {
      setErrorMsg('Short description cannot be empty');
      return;
    }
    if (!blog.blogUrl.trim()) {
      setErrorMsg('Blog URL cannot be empty');
      return;
    }
    // Convert content to HTML
    const contentHTML = convertToRaw(blog.content.getCurrentContent());
    console.log('Content HTML:', contentHTML);
    // Call newBlog function from context
    try {
      await newBlog(blog.title, blog.shortDescription, contentHTML);
      // Reset form fields
      setBlog({
        title: '',
        shortDescription: '',
        content: EditorState.createEmpty(),
        blogUrl: '',
        tags: '',
      });
      setErrorMsg('');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <BlogContainer>
      <Title>Add a New Blog</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Short Description:</Label>
          <Input
            type="text"
            name="shortDescription"
            value={blog.shortDescription}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Content:</Label>
          <Editor
            editorState={blog.content}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleContentChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Blog URL:</Label>
          <Input
            type="url"
            name="blogUrl"
            value={blog.blogUrl}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Tags:</Label>
          <Input
            type="text"
            name="tags"
            value={blog.tags}
            onChange={handleChange}
          />
          <small>Separate tags with commas (e.g., technology, programming)</small>
        </FormGroup>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <button type="submit">Submit</button>
      </Form>
    </BlogContainer>
  );
};

export default NewBlog;
